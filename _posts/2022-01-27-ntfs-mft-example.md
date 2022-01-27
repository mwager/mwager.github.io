---
layout: post
title: "Data runs (Run-Lists) in NTFS filesystems 📂🔪"
date: 2022-01-27 12:36:11
categories: cyber_security
---

This post explains how data is stored within the [New Technology File System (NTFS)](https://docs.microsoft.com/en-us/windows-server/storage/file-server/ntfs-overview) which is the primary file system for recent versions of Windows and Windows Server. Based on an example I will explain how to "carve" a file out of the [master file table](https://en.wikipedia.org/wiki/NTFS#Master_File_Table).

## Setup

I formatted a 32GB USB Drive with NTFS and copied a movie file on it:

<img src="/images/ls.png">

The file is <b>21.663.347</b> bytes in size (21.7MB), which is larger than an MFT record, which has 1024 bytes in NTFS. For files smaller than 1024 bytes the content is stored directly inside the MFT record, but if the size is larger this is called "none-resident" and then the location & size of the content on disk is stored in so-called "Data runs" inside the MFT record of this file. We will now analyze the runlist and try to find the raw data of the movie.

For analyzation I am using [FTK Imager](https://www.exterro.com/ftk-imager) on Windows. Opening the USB Drive directly and looking at the file we get the MFT record number, which is 30. With a little math we can jump to the record: Each record has 1024 bytes, so we need to multiply 30 with 1024 to get the byte offset in the MFT: 30720

<img src="/images/mft-record.png">

The image shows a screenshot of the hex-representation of the MFT record. I selected the filename, which is stored inside the MFT record as well. The red selection is the run-list for our file (Starting at decimal offet 64 from the data attribute 0x80000000). It is:

<b><span style="color:red">3</span><span style="color:green">2</span> B0 14 D1 00 02</b>

So the <b style="color: green">2</b> tells us the size: <b>B0 14</b> -> little endian -> 0x14B0 which is the value 5296 in decimal representation. This is the size of clusters used for the file content. We need to convert it to bytes by multiplying it with the cluster size, which is 4096. So we get: 21.692.416 Byte. This is just a little bit larger than our original file size and this is caused by internal NTFS organization structures. But this makes sense so far.

The last <b style="color: red">3</b> bytes <b>D1 00 02</b> tell us the starting cluster number of the content which is 131.281 in decimal representation (little endian!).

So now in FTK Imager we can select the NTFS Evidence, use "Go to sector/cluster..." and put in this number. After that we just set the selection size to 21.692.416 Byte and save as <b>fragment.mpeg</b>.

Opening this file with VLC will play the movie. Here we go!

<img src="/images/mft-save.png">

## Resources

- [MFT Run Lists explained by Frank Griffitts](https://www.youtube.com/watch?v=AbApUDui8wM)
