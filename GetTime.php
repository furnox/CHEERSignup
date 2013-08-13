<?php
$handle=curl_init();
curl_setopt($handle,CURLOPT_URL,'http://tycho.usno.navy.mil/cgi-bin/time.pl');
curl_setopt($handle,CURLOPT_HEADER,0);
curl_exec($handle);
?>