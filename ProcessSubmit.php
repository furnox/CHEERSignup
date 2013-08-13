<?php

$familyName=$_POST['familyName'];
$homeNumber=$_POST['homeNumber'];
$cellNumber=$_POST['cellNumber'];
$otherNumber=$_POST['otherNumber'];
$isTeaching=$_POST['isTeaching'];
$notes=$_POST['notes'];
$numberChildren=$_POST['numberChildren'];
$childName=$_POST['childName'];
$childGrade=$_POST['childGrade'];
$childAge=$_POST['childAge'];
$OnePOneC=$_POST['OnePOneC'];
$OnePTwoC=$_POST['OnePTwoC'];
$TwoPOneC=$_POST['TwoPOneC'];
$TwoPTwoC=$_POST['TwoPTwoC'];
$childNotes=$_POST['childNotes'];

$params=sprintf("entry.0.single=%s&entry.1.single=%s&entry.2.single=%s&entry.4.single=%s&entry.5.single=%s&entry.6.single=%s&entry.7.single=%s&entry.8.single=%s&entry.9.single=%s&entry.10.single=%s&entry.11.single=%s&entry.12.single=%s&entry.13.single=%s&entry.14.single=%s&entry.15.single=%s",$familyName,$homeNumber,$isTeaching,$numberChildren,$childName,$childGrade,$childAge,$OnePOneC,$OnePTwoC,$TwoPOneC,$TwoPTwoC,$cellNumber,$otherNumber,$notes,$childNotes);
$handle=curl_init();
curl_setopt($handle,CURLOPT_URL,'https://docs.google.com/spreadsheet/formResponse?formkey=dEtNRWtQak5wZ2FPUjRjQzktNjdqb1E6MA&amp;ifq');
curl_setopt($handle,CURLOPT_POST,true);
curl_setopt($handle,CURLOPT_POSTFIELDS,$params);
curl_setopt($handle,CURLOPT_RETURNTRANSFER,true);
$result=curl_exec($handle);
curl_close($handle);
if (strstr($result,'Your response has been recorded')) {
    header('HTTP/1.1 200 Ok');
} else {
    header("HTTP/1.1 500 Internal Server Error");
}