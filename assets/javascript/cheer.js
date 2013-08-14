var $firstPeriod=$("<select></select>");
var $secondPeriod=$("<select></select>");
var $grade=$("<select></select>").append("<option value='-1'>Choose a grade...</option>").append("<option value='P'>Preschool</option>").append("<option value='K'>Kindergarten</option>").append("<option value='1'>First</option>").append("<option value='2'>Second</option>").append("<option value='3'>Third</option>").append("<option value='4'>Fourth</option>").append("<option value='5'>Fifth</option>").append("<option value='6'>Sixth</option>").append("<option value='7'>Seventh</option>").append("<option value='8'>Eighth</option>").append("<option value='9'>Ninth</option>").append("<option value='10'>Tenth</option>").append("<option value='11'>Eleventh</option>").append("<option value='12'>Twelfth</option>");

function ParseGoogleDocData(data,$period) {
	$("<option value='-1'>Choose a course...</option>").appendTo($period);
	for (var index=0;index<data.feed.entry.length;index++) {
		var datum=data.feed.entry[index];
		var course=datum.title.$t;
		var desc=datum.content.$t.replace('coursedescription: ','').replace("'","&apos;");
		$("<option value='"+course+"' class='course' desc='"+desc+"'>"+course+"</option>").appendTo($period);
	}
}
function GetFirstPeriod(data) {
    ParseGoogleDocData(data,$firstPeriod);
}
function GetSecondPeriod(data) {
    ParseGoogleDocData(data,$secondPeriod);
}
var startDateTime=new Date(2013,0,31,9,0,0,0);
var currentDateTime;
var overlay;
var summary;

function ResetFields() {
    $('input:text').val('');
    $('textarea').val('');
    $('input:checkbox').attr('checked',false);
    $('select option:selected').attr('selected',false);
    $('div.child_entry').remove();
}
$('span#begin').text(moment(startDateTime).format('dddd, MMMM DD, YYYY [at] h:mm a'));
function CheckFields() {
    if (ValidateFields()) {
        var summaryTable=$('#courses > tbody');
        $('tr',summaryTable).remove();
        var top=($(window).height()-summary.height())/2+$(window).scrollTop()+'px';
        var left=($(window).width()-summary.width())/2+$(window).scrollLeft()+'px';
        var left=(parseInt(window.screen.availWidth)-parseInt(summary.css('width')))/2;
        for (var index=0;index<$('select#number_children').val();index++) {
            var childName=$('input#child_'+index+'_name').val();
            var OnePOneC=$('select#child_'+index+'_1P1C option:selected').val();
            var OnePTwoC=$('select#child_'+index+'_1P2C option:selected').val();
            var TwoPOneC=$('select#child_'+index+'_2P1C option:selected').val();
            var TwoPTwoC=$('select#child_'+index+'_2P2C option:selected').val();
            $('<tr></tr>').appendTo(summaryTable).append("<td rowspan=2 class='name'>"+childName+"</td>").append("<td class='choice'>"+OnePOneC+"</td>").append("<td class='choice'>"+TwoPOneC+"</td>");
            $('<tr height=25></tr>').appendTo(summaryTable).append("<td class='choice'>"+OnePTwoC+"</td>").append("<td class='choice'>"+TwoPTwoC+"</td>");
        }

        overlay.show();
        summary.css({'top':top,'left':left}).show();
    }
    return false;
}
function SubmitFields(correct) {
    summary.hide();
    overlay.hide();
    if (!correct) {
        return false;
    }
    var count=0;
    var parentLastName=$('input#parent_last_name').val();
    var parentFirstName=$('input#parent_first_name').val();
    var homeNumber=$('input#home_phone_number').val();
    var cellNumber=$('input#cell_phone_number').val();
    var otherNumber=$('input#other_phone_number').val();
    var isTeaching=$('input#isTeaching').attr('checked')==='checked';
    var helpingPreferences=$('textarea#helping_preferences').val();
    var notesCommittee=$('textarea#notes_committee').val();
    var notes=$('textarea#notes').val();
    var numberChildren=$('select#number_children').val();
    for (var index=0;index<numberChildren;index++) {
        var childName=$('input#child_'+index+'_name').val();
        var childGrade=$('select#child_'+index+'_grade').val();
        var childAge=$('input#child_'+index+'_age').val();
        var OnePOneC=$('select#child_'+index+'_1P1C option:selected').val();
        var OnePTwoC=$('select#child_'+index+'_1P2C option:selected').val();
        var TwoPOneC=$('select#child_'+index+'_2P1C option:selected').val();
        var TwoPTwoC=$('select#child_'+index+'_2P2C option:selected').val();
        var childNotes=$('textarea#child_'+index+'_notes').val();
        count++;
        $.ajax(
            {
                type:'POST',
                url:'ProcessSubmit.php',
                data:{
                    'parentLastName':encodeURIComponent(parentLastName),
                    'parentFirstName':encodeURIComponent(parentFirstName),
                    'homeNumber':encodeURIComponent(homeNumber),
                    'cellNumber':encodeURIComponent(cellNumber),
                    'otherNumber':encodeURIComponent(otherNumber),
                    'isTeaching':encodeURIComponent(isTeaching),
                    'notesCommittee':encodeURIComponent(notesCommittee),
                    'notes':encodeURIComponent(notes),
                    'numberChildren':encodeURIComponent(numberChildren),
                    'childName':encodeURIComponent(childName),
                    'childGrade':encodeURIComponent(childGrade),
                    'childAge':encodeURIComponent(childAge),
                    'OnePOneC':encodeURIComponent(OnePOneC),
                    'OnePTwoC':encodeURIComponent(OnePTwoC),
                    'TwoPOneC':encodeURIComponent(TwoPOneC),
                    'TwoPTwoC':encodeURIComponent(TwoPTwoC),
                    'childNotes':encodeURIComponent(childNotes)
                },
                dataType:'text',
                error:
                    function(xhr,status,error) {
                        $('div#message').text('Umm, something went wrong. Please try again and if the problem persists, email ').append('<a href="mailto:cheeridaho@gmail.com">CHEER</a>');
                    },
                success:
                    function(data,status,xhr) {
                        count--;
                        if (count===0) {
                            ResetFields();
                            $('div#message').text('Classes successfully submitted. See you in class.');
                        }
                    }
            }
        );
    }
    return false;
}
function ValidateFields() {
    var valid=true;
    $('.error').removeClass('error');
    $('div#message').text('');
    // Input fields
    $('input[type=text].required').each(
        function() {
            if ($(this).val()=='') {
                valid=false;
                $(this).prev().addClass('error');
            }
        }
    );
    // Select fields
    $('select.required').each(
        function() {
            if ($(this).val()=='-1') {
                valid=false;
                $(this).prev().addClass('error');
            }
        }
    );
    // Special fields
    if ($('input#home_phone_number').val()=='' && $('input#cell_phone_number').val()=='') {
        valid=false;
        $('input#home_phone_number').prev().addClass('error');
        $('input#cell_phone_number').prev().addClass('error');
    }

    if (!valid) {
        $('div#message').text('Empty fields. Please check the red fields.');
    }
    return valid;
}
function FormatRemainingTime(time) {
    var day=86400000;
    var hour=3600000;
    var minute=60000;
    var second=1000;
    var days=Math.floor(time / day);
    time=time-days*day;
    var hours=Math.floor(time / hour);
    time=time-hours*hour;
    var minutes=Math.floor(time / minute);
    time=time-minutes*minute;
    var seconds=Math.floor(time / second);
    return days+':'+hours+':'+(minutes<10?'0':'')+minutes+':'+(seconds<10?'0':'')+seconds;
}
jQuery(function($){
    $.ajax({
        url:'http://www.bluesailstudio.com/GetTime.php',
        success:
            function(data) {
				var ts=parseInt($(data).find('t')[0].textContent);
				if (isNaN(ts)) {
					ts=parseInt(data.text);
				}
                currentDateTime=new Date(ts);
                var $countdown=$('div#countdown');
                var diff=startDateTime.getTime()-currentDateTime.getTime();
                if (diff>=0) {
                    $('input,select,textarea').prop('disabled',true);
                    $('span#remaining',$countdown).text(FormatRemainingTime(diff));
                    $handle=setInterval(
                        function() {
                            currentDateTime.setTime(currentDateTime.getTime()+1000);
                            diff=startDateTime.getTime()-currentDateTime.getTime();
                            if (diff>=0) {
                                $('span#remaining',$countdown).text(FormatRemainingTime(diff));
                            } else {
                                $('input,select,textarea').prop('disabled',false);
                                $countdown.remove();
                                clearInterval($handle);
                            }
                        }
                    ,1000);
                } else {
                    $countdown.remove();
                }
            },
        dataType:'xml'
    });
    $('select#number_children').on('change',
        function() {
            var $childEntries=$('div#child_entries');
            var childEntriesCount=$('div.child_entry').length;
            if (parseInt(this.value)<childEntriesCount) {
                $('div.child_entry').slice(parseInt(this.value)).remove();
            } else {
                for (var index=childEntriesCount;index<this.value;index++) {
                    var $childEntry=$("<div class='child_entry'></div>");
                    $('<div>Child '+(index+1)+'</div>').addClass('legend').appendTo($childEntry);
                    // Name
                    $childEntry.append($("<div class='form-entry child'></div>").append("<label class='title required' for='child_"+index+"_name'>Name</label>").append("<input type='text' value='' class='required' id='child_"+index+"_name'/>"));
                    // Grade
                    $childEntry.append($("<div class='form-entry child'></div>").append("<label class='title required' for='child_"+index+"_grade'>Grade</label>").append($grade.clone().attr('id','child_'+index+'_grade').addClass('required')));
                    // Age
                    $childEntry.append($("<div class='form-entry child'></div>").append("<label class='title' for='child_"+index+"_age'>Age</label>").append("<input type='text' value='' class='' id='child_"+index+"_age'/>"));
                    // 1P1C
                    $childEntry.append($("<div class='form-entry child'></div>").append("<label class='title' for='child_"+index+"_1P1C'>First Period, First Choice</label>").append($firstPeriod.clone().attr('id','child_'+index+'_1P1C')));
                    // 1P2C
                    $childEntry.append($("<div class='form-entry child'></div>").append("<label class='title' for='child_"+index+"_1P2C'>First Period, Second Choice</label>").append($firstPeriod.clone().attr('id','child_'+index+'_1P2C')));
                    // 2P1C
                    $childEntry.append($("<div class='form-entry child'></div>").append("<label class='title' for='child_"+index+"_2P1C'>Second Period, First Choice</label>").append($secondPeriod.clone().attr('id','child_'+index+'_2P1C')));
                    // 2P2C
                    $childEntry.append($("<div class='form-entry child'></div>").append("<label class='title' for='child_"+index+"_2P2C'>Second Period, Second Choice</label>").append($secondPeriod.clone().attr('id','child_'+index+'_2P2C')));
                    // Child Notes
                    $childEntry.append($("<div class='form-entry child'></div>").append("<label class='title' for='child_"+index+"_notes'>Child notes</label>").append("<textarea rows='3' cols='30' class='' id='child_"+index+"_notes'></textarea>"));

                    $childEntries.append($childEntry);
                }
            }
            var hoverBox=$('div#course_description');
            $('option.course').hover(
                function() {
                    hoverBox.text($(this).attr('desc'));
                    hoverBox.css('top',$(this).offset().top+'px');
                    hoverBox.css('left',($(this).offset().left+225)+'px');
                    hoverBox.show();
                },
                function() {
                    hoverBox.hide();
                }
            );
            $childEntries.show();
        }
    );
    overlay=$('#overlay');
    summary=$('#summary');
});