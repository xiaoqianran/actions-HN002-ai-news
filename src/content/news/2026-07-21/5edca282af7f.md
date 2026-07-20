---
title: "JSON5E - JSON5 for Humans"
originalUrl: "https://github.com/boris-kolpackov/libpdjson5/blob/master/JSON5E.md"
date: "2026-07-20T23:11:33.564Z"
---

**Title:** JSON5E - JSON5 for Humans  
**标题：** JSON5E - 面向人类的 JSON5  

JSON5E is an extension of the JSON5 format that aims to be even more natural to write and maintain by hand. Where JSON5 retains the overall JSON shape and draws on ECMAScript 5 for inspiration, JSON5E tries harder to approximate the look and feel of a typical configuration file found in /etc while retaining the JSON object model.  
JSON5E 是 JSON5 格式的扩展，旨在使其更易于手动编写和维护。JSON5 保留了 JSON 的整体结构，并从 ECMAScript 5 中汲取灵感，而 JSON5E 则更努力地模仿 /etc 中典型配置文件的外观和感觉，同时保留 JSON 对象模型。  

Specifically, JSON5E extends JSON5 with the following syntax: Implied top-level objects. JSON5: { delay: 10, timeout: 30 } JSON5E: delay: 10, timeout: 30 Note that top-level arrays and simple values are still supported (but there are no implied top-level arrays).  
具体来说，JSON5E 通过以下语法扩展了 JSON5：隐含的顶层对象。JSON5: { delay: 10, timeout: 30 } JSON5E: delay: 10, timeout: 30 请注意，顶层数组和简单值仍然受支持（但没有隐含的顶层数组）。  

Newline in addition to comma as a separator. JSON5: { delay: 10, timeout: 30 } JSON5E: { delay: 10 timeout: 30 } Note that it must be a newline, not just a whitespace.  
除了逗号外，换行也可作为分隔符。JSON5: { delay: 10, timeout: 30 } JSON5E: { delay: 10 timeout: 30 } 请注意，必须是换行符，而不仅仅是空白字符。  

- and . are allowed in unquoted object member names. But not as a first character. JSON5: { 'connection-delay': 10, 'connection-timeout': 30 } JSON5E: { connection-delay: 10, connection-timeout: 30 }  
在未加引号的对象成员名称中允许使用 - 和 .。但不能作为首字符。JSON5: { 'connection-delay': 10, 'connection-timeout': 30 } JSON5E: { connection-delay: 10, connection-timeout: 30 }  

#-style comments in addition to // and /* */. JSON5: { // Initial delay before connecting. // delay: 10, // Connection timeout. // timeout: 30 } JSON5E: { # Initial delay before connecting. # delay: 10, # Connection timeout. # timeout: 30 }  
除了 // 和 /* */ 外，还支持 # 样式的注释。JSON5: { // Initial delay before connecting. // delay: 10, // Connection timeout. // timeout: 30 } JSON5E: { # Initial delay before connecting. # delay: 10, # Connection timeout. # timeout: 30 }  

Putting it all together, JSON5: { // Initial delay before connecting. // 'connection-delay': 10, // Connection timeout. // 'connection-timeout': 30 } JSON5E: # Initial delay before connecting. # connection-delay: 10 # Connection timeout. # connection-timeout: 30 Which looks a lot more like a typical configuration file.  
综合以上所有特性，JSON5: { // Initial delay before connecting. // 'connection-delay': 10, // Connection timeout. // 'connection-timeout': 30 } JSON5E: # Initial delay before connecting. # connection-delay: 10 # Connection timeout. # connection-timeout: 30 这看起来更像一个典型的配置文件。  

The following parser implementations support JSON5E: C: libpdjson5 C++: libstud-json  
以下解析器实现支持 JSON5E：C: libpdjson5 C++: libstud-json