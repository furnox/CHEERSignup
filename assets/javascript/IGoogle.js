var IGoogle=
    function() {
        var $firstPeriod=$("<select></select>");
        var $secondPeriod=$("<select></select>");
        var $grade=$("<select></select>").append("<option value='-1'>Choose a grade...</option>").append("<option value='P'>Preschool</option>").append("<option value='K'>Kindergarten</option>").append("<option value='1'>First</option>").append("<option value='2'>Second</option>").append("<option value='3'>Third</option>").append("<option value='4'>Fourth</option>").append("<option value='5'>Fifth</option>").append("<option value='6'>Sixth</option>").append("<option value='7'>Seventh</option>").append("<option value='8'>Eighth</option>").append("<option value='9'>Ninth</option>").append("<option value='10'>Tenth</option>").append("<option value='11'>Eleventh</option>").append("<option value='12'>Twelfth</option>");
        
        var ParseGoogleDocData=
            function (data,$period) {
                $("<option value='-1'>Choose a course...</option>").appendTo($period);
                for (var index=0;index<data.feed.entry.length;index++) {
                    var datum=data.feed.entry[index];
                    var course=datum.title.$t;
                    var desc=datum.content.$t.replace('coursedescription: ','').replace("'","&apos;");
                    $("<option value='"+course+"' class='course' desc='"+desc+"'>"+course+"</option>").appendTo($period);
                }
            };
        function SetFirstPeriod(data) {
            ParseGoogleDocData(data,$firstPeriod);
        }
        function SetSecondPeriod(data) {
            ParseGoogleDocData(data,$secondPeriod);
        }
        function GetFirstPeriod() {
            return $firstPeriod;
        }
        function GetSecondPeriod() {
            return $secondPeriod;
        }
    }
