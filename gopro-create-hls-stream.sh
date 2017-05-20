#!/usr/bin/env sh

ffmpeg -v info \
       -i udp://:8554 \
       -c:v copy \
       -c:a copy \
       -bufsize 1835k \
       -pix_fmt yuv420p \
       -flags \
       -global_header \
       -hls_time 10 \
       -hls_list_size 6 \
       -hls_wrap 10 \
       -start_number 1 \
       output.m3u8
