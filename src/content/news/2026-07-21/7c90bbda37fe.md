---
title: "Automatically Assign a Category to Uncategorized Rows in Power Query and DAX"
originalUrl: "https://towardsdatascience.com/automatically-assign-a-category-to-uncategorised-rows-in-power-query-and-dax/"
date: "2026-07-20T23:29:36.773Z"
---

# Automatically Assign a Category to Uncategorized Rows in Power Query and DAX  
在 Power Query 和 DAX 中自动为未分类行分配类别

The Scenario  
One of my clients wanted to report on seat ownership. Each seat in the office building must be assigned to an organisational unit (OU). There is a list of all seats, and the owning OU should be set for each seat. But some seats don’t have an owning OU set. Therefore, they decided to assign all unassigned seats to the OU that owns the most seats. This must be done by room and by floor. Look at the following floor plan: Figure 1 – Example floor plan with unassigned seats (This is not a real one. Just an example created by the Author) Look at the marked seats in room B. As you can notice, “OU 3” owns the most seats in that room. Therefore, these seats must be assigned to that OU. But when looking at the entire floor, “OU 5” own the most seats across all rooms. If there is a room on that floor where all seats aren’t assigned, they must be assigned to “OU 5”. These are the business rules for assigning unassigned seats.

场景  
我的一个客户需要报告座位所有权情况。办公楼内的每个座位都必须分配给一个组织单位（OU）。存在一个所有座位的列表，每个座位的所属OU应被设置。但有些座位尚未设置所属OU。因此，他们决定将所有未分配的座位分配给拥有最多座位的OU。这必须按房间和按楼层进行。查看以下楼层平面图：图1 – 带有未分配座位的示例楼层平面图（这不是真实的，仅是作者创建的示例）查看B房中标记的座位。如您所见，“OU 3”在该房中拥有最多座位。因此，这些座位必须分配给该OU。但查看整个楼层时，“OU 5”在所有房间中拥有最多座位。如果该楼层上存在所有座位均未分配的房间，则必须将它们分配给“OU 5”。这些是分配未分配座位的业务规则。

The data source  
All the data is stored in Excel files. Each file has a date at the start of the filename. For example: 20260331_Seatlist.xlsx 20260430_Seatlift.xlsx 20260531_Seatlist.xlsx There is one file per month that contains all existing seats in the building, along with their assignments for that month. This is because the assignments change over time and the user must be able to see the differences. But only the latest dataset (Excel file) should be used to assign the unassigned seats.

数据源  
所有数据存储在Excel文件中。每个文件的文件名以日期开头。例如：20260331_Seatlist.xlsx 20260430_Seatlift.xlsx 20260531_Seatlist.xlsx 每月有一个文件，包含楼内所有现有座位及其当月的分配情况。这是因为分配会随时间变化，用户必须能够查看差异。但仅应使用最新数据集（Excel文件）来分配未分配的座位。

Do it in Power Query  
As you might know from my previous articles, I aim to perform data transformations as early as possible in the load chain. Therefore, it was natural to start doing the work in Power Query. What I needed to do was the following steps for each row without an assigned OU: Find the latest file among all files loaded Read this file Search for the rows for the current room (The room in the current row) Count the number of seats per OU in that room Sort descending by the number of seats Keep only the first row – the one with the OU that has the highest number of seats Assign that OU to the current row For this, I created an M-function [CheckMax_ForSeat]. The code for this function is comprised of the following segments: 1. Find the latest file:  
```
Source = Folder.Files(SourceFolder & "\Seatlists\"),  
#"Filtered Rows" = Table.SelectRows(Source, each Text.StartsWith([Name], "20")),  
#"Sorted Rows" = Table.Sort(#"Filtered Rows",{{"Name", Order.Descending}}),  
#"Kept First Rows" = Table.FirstN(#"Sorted Rows",1)
```  
This code works, as the date is at the beginning of the file name, as mentioned above. 2. Read the file:  
```
#"Added Custom" = Table.AddColumn(#"Kept First Rows", "FullFilePath", each [Folder Path] & [Name], type text),  
#"Invoked Custom Function" = Table.AddColumn(#"Added Custom", "ReadSingleFile_Seatlist", each ReadSingleFile_Seatlist_ForSeat([FullFilePath])),  
#"Removed Other Columns" = Table.SelectColumns(#"Invoked Custom Function",{"Name", "Date modified", "ReadSingleFile_Seatlist"}),  
#"Expanded ReadSingleFile_Seatlist" = Table.ExpandTableColumn(#"Removed Other Columns", "ReadSingleFile_Seatlist", {"OU-No.", "Room-No."}, {"OU-No.", "Room-No."}),  
#"Changed Type" = Table.TransformColumnTypes(#"Expanded ReadSingleFile_Seatlist",{{"OU-No.", type text}, {"Room-No.", type text}})
```  
As you can see, I use a second M-Function to read the file: ReadSingleFile_Seatlist_ForSeat This file is used to read the current file. It contains the M-code to read an Excel file and keep only the needed columns. You get the same M-code when you import a single Excel file in Power Query. For this reason, I will not show it here.

在 Power Query 中执行  
如我之前文章所述，我旨在加载链中尽可能早地执行数据转换。因此，自然从 Power Query 开始这项工作。对于每个没有分配 OU 的行，我需要执行以下步骤：在所有加载的文件中找到最新文件 读取该文件 搜索当前房间的行（当前行中的房间） 计算该房中每个 OU 的座位数 按座位数降序排序 仅保留第一行 – 即拥有最多座位的 OU 将该 OU 分配给当前行 为此，我创建了一个 M 函数 [CheckMax_ForSeat]。该函数的代码由以下部分组成：1. 查找最新文件：  
```
Source = Folder.Files(SourceFolder & "\Seatlists\"),  
#"Filtered Rows" = Table.SelectRows(Source, each Text.StartsWith([Name], "20")),  
#"Sorted Rows" = Table.Sort(#"Filtered Rows",{{"Name", Order.Descending}}),  
#"Kept First Rows" = Table.FirstN(#"Sorted Rows",1)
```  
此代码有效，因为如前所述，日期位于文件名开头。2. 读取文件：  
```
#"Added Custom" = Table.AddColumn(#"Kept First Rows", "FullFilePath", each [Folder Path] & [Name], type text),  
#"Invoked Custom Function" = Table.AddColumn(#"Added Custom", "ReadSingleFile_Seatlist", each ReadSingleFile_Seatlist_ForSeat([FullFilePath])),  
#"Removed Other Columns" = Table.SelectColumns(#"Invoked Custom Function",{"Name", "Date modified", "ReadSingleFile_Seatlist"}),  
#"Expanded ReadSingleFile_Seatlist" = Table.ExpandTableColumn(#"Removed Other Columns", "ReadSingleFile_Seatlist", {"OU-No.", "Room-No."}, {"OU-No.", "Room-No."}),  
#"Changed Type" = Table.TransformColumnTypes(#"Expanded ReadSingleFile_Seatlist",{{"OU-No.", type text}, {"Room-No.", type text}})
```  
如您所见，我使用了第二个 M 函数来读取文件：ReadSingleFile_Seatlist_ForSeat 该文件用于读取当前文件。它包含读取 Excel 文件并仅保留所需列的 M 代码。在 Power Query 中导入单个 Excel 文件时会获得相同的 M 代码。因此，此处不展示。

3. Keep only the rows for the current room and get the OU with the highest number of seats:  
```
#"Filter out Empty OE" = Table.SelectRows(#"Changed Type", each ([#"Room-No."] = RoomNo) and ([#"OU-No."] <> null)),  
#"Grouped Rows" = Table.Group(#"Filter out Empty OU", {"OU-No.", "Assigned_OU"}, {{"Seat_Count", each Table.RowCount(_), Int64.Type}}),  
#"Sorted Seat_Count" = Table.Sort(#"Grouped Rows",{{"Seat_Count", Order.Descending}, {"Assigned_OU", Order.Ascending}}),  
#"Kept highest Seat Count" = Table.FirstN(#"Sorted Seat_Count",1)
```  
I must perform these operations twice: Once for the seats in the same room Once for the rooms on the same floor The result is two columns, containing the OU to assign according to the same room or the floor. If the room has no assigned seats, set the OU to the OU with the highest number of seats on the entire floor. Otherwise, take the OU with the most assigned seats in the same room.

3. 仅保留当前房间的行并获取座位数最多的 OU：  
```
#"Filter out Empty OE" = Table.SelectRows(#"Changed Type", each ([#"Room-No."] = RoomNo) and ([#"OU-No."] <> null)),  
#"Grouped Rows" = Table.Group(#"Filter out Empty OU", {"OU-No.", "Assigned_OU"}, {{"Seat_Count", each Table.RowCount(_), Int64.Type}}),  
#"Sorted Seat_Count" = Table.Sort(#"Grouped Rows",{{"Seat_Count", Order.Descending}, {"Assigned_OU", Order.Ascending}}),  
#"Kept highest Seat Count" = Table.FirstN(#"Sorted Seat_Count",1)
```  
我必须执行这些操作两次：一次针对同一房间的座位 一次针对同一楼层的房间 结果是两列，包含根据同一房间或楼层要分配的 OU。如果房间没有分配座位，则将 OU 设置为整个楼层中座位数最多的 OU。否则，取同一房间中分配座位最多的 OU。

It worked very well on my laptop. But then… This is not practical I encountered two major issues: As soon as I switched the source to a network-based folder, performance dropped drastically. A SharePoint folder was the worst, followed by a shared folder on a file server. The problem was that the M-functions mentioned above must be executed once for each row in the dataset. This resulted in around 1 GB of data being read, while the total across the three available files is 300 KB. The cause of the drop in performance wasn’t the amount of data read, as it worked well on my laptop. The reason was network traffic latency. Each round trip cost time, which resulted in a large amount of time needed to load the data, By the way, the Power BI file is only 4 MB after loading the data and assigning the OUs to all seats. It took around one hour to load the data from the shared folder – over two hours from SharePoint. The other issue was even more severe. While it worked in Power BI Desktop, it didn’t work after publishing it to the Service. The reason is that dynamic data sources are not allowed in Power Query. Here are some links about this issue. I tried the approaches mentioned there, but they were

它在我的笔记本电脑上运行良好。但后来……这并不实用 我遇到了两个主要问题： 一旦将源切换到基于网络的文件夹，性能急剧下降。SharePoint 文件夹最差，其次是文件服务器上的共享文件夹。问题在于上述 M 函数必须针对数据集中的每一行执行一次。这导致读取了约 1 GB 的数据，而三个可用文件的总大小仅为 300 KB。性能下降的原因不是读取的数据量，因为它在我的笔记本电脑上运行良好。原因是网络流量延迟。每次往返都花费时间，导致加载数据需要大量时间。 顺便说一下，加载数据并将 OU 分配给所有座位后，Power BI 文件仅 4 MB。从共享文件夹加载数据大约需要一小时 – 从 SharePoint 则需要两个多小时。 另一个问题更为严重。虽然它在 Power BI Desktop 中有效，但发布到服务后却无效。原因是 Power Query 中不允许动态数据源。 以下是有关此问题的一些链接。我尝试了那里提到的方法，但它们 were