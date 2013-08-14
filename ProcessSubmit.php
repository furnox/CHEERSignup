<?php

$parentLastName=$_POST['parentLastName'];
$parentFirstName=$_POST['parentFirstName'];
$homeNumber=$_POST['homeNumber'];
$cellNumber=$_POST['cellNumber'];
$otherNumber=$_POST['otherNumber'];
$isTeaching=$_POST['isTeaching'];
$helpingPreferences=$_POST['helpingPreferences'];
$notesForCommittee=$_POST['notesCommittee'];
$notesPrivate=$_POST['notesPrivate'];
$allergies=$_POST['allergies'];
$numberChildren=$_POST['numberChildren'];
$childName=$_POST['childName'];
$childGrade=$_POST['childGrade'];
$childAge=$_POST['childAge'];
$OnePOneC=$_POST['OnePOneC'];
$OnePTwoC=$_POST['OnePTwoC'];
$TwoPOneC=$_POST['TwoPOneC'];
$TwoPTwoC=$_POST['TwoPTwoC'];

// Parent Last Name: entry.0.single
// Parent First Name: entry.1.single
// Home Phone Number: entry.2.single
// Cell Phone Number: entry.3.single
// Other Phone Number: entry.4.single
// Teaching: entry.5.single
// Helping Preferences: entry.6.single
// Notes For Committee: entry.7.single
// Private Note for Teacher: entry.8.single
// Allergies: entry.9.single
// Number of Children: entry.10.single
// Child's Name: entry.11.single
// Child's Grade: entry.12.single
// Child's Age: entry.13.single
// First Period, First Choice: entry.14.single
// First Period, Second Choice: entry.15.single
// Second Period, First Choice: entry.16.single
// Second Period, Second Choice: entry.17.single
$params=sprintf("entry.0.single=%s&entry.1.single=%s&entry.2.single=%s&entry.4.single=%s&entry.5.single=%s&entry.6.single=%s&entry.7.single=%s&entry.8.single=%s&entry.9.single=%s&entry.10.single=%s&entry.11.single=%s&entry.12.single=%s&entry.13.single=%s&entry.14.single=%s&entry.15.single=%s&entry.16.single=%s&entry.17.single=%s",$familyName,$homeNumber,$isTeaching,$numberChildren,$childName,$childGrade,$childAge,$OnePOneC,$OnePTwoC,$TwoPOneC,$TwoPTwoC,$cellNumber,$otherNumber,$notes,$childNotes);
$handle=curl_init();
curl_setopt($handle,CURLOPT_URL,'https://docs.google.com/spreadsheet/formResponse?formkey=dG80clg2WkNqcEczMmNlY1E3ZmozaVE6MQ&amp;ifq');
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