$(document).ready(function() {
  
  $('.container').on('click','.delete_project', function() { 
  	var project = $(this);
    $.ajax({
      type: "GET",
      url: project.attr("href")
    }).done(function() { 
      project.parents('.project_tasks_content').remove();
    });
  });

  $('.container').on('click','.delete_task', function() { 
  	var task = $(this);
    $.ajax({
      type: "GET",
      url: task.attr("href")
    }).done(function() { 
      task.parents('.li_task').remove();
    });
  });

  $('.container').on('click','.add_todo_list_a', function() {
    $(this).parents(".container").find('.new_project').show();
    return false;
  });

  $('.container').on('submit','.new_project', function() { 
  	var project = $(this);
    var values = $(this).serialize();
    var renderProject = function(json) {
    	var project = $("<div class='project_tasks_content'>"+
    			"<div class='project_block'>"+
					  	"<img alt='1' class='project_block_image' src='/assets/project.gif'>"+
					  	"<span class='project_name'>"+json.name+"</span>"+
					  	"<input class='project_input_text' type='text' update-project-path='/projects/"+json.id+"'>"+
					  	"<input class='project_input_button' type='button' value='OK'>"+
					  	"<a class='delete_project' data-method='delete' data-remote='true' href='/projects/"+json.id+"' rel='nofollow'><img alt='3' border='0' class='delete_project_image' src='/assets/delete_project.gif'></a>"+
					  	"<a class = 'edit-project' href=''><img alt='2' border='0' class='edit_project_image' src='/assets/edit_project.gif'></a>"+
					  "</div>"+
					 	"<div class='add_task_block'>"+
					 		"<img alt='7' class='add_task_block_image' src='/assets/task_image.gif'>"+
					    "<input class='add_task_input_text' type='text' placeholder='Start typing here to create a task...' data-project-tasks-path='/projects/"+json.id+"/tasks'>"+
					 		"<input class = 'project_input_date' type = 'date'>"+
              "<a class='add_task_a' href=''>Add Task</a>"+
					 	"</div> "+
					  "<ul class='task_list' path = '/projects/"+json.id+"/tasks/sort' >"+
					  "</ul>"+
					"</div>");
    	return project;
    };	
    $.ajax({
      type: "POST",
      url: project.attr("action"),
      data: values 
    }).done(function(data) {
      if (Object.prototype.toString.call(data) == "[object Object]") {
        $(".project_tasks").append(renderProject(data));
        sort_task();
      }
    });
  	$(this).parents(".container").find('.new_project').hide();
    return false;
  }); 
   
   $('.container').on('click',".add_task_a", function() {
    var path = $(this).parents(".add_task_block").find(".add_task_input_text").attr("data-project-tasks-path");
    var name = $(this).parents(".add_task_block").find(".add_task_input_text").val();
    var deadline = $(this).parents(".add_task_block").find(".project_input_date").val();
    var element = $(this);
    var renderTask = function(json) {
      var temp = "<li class='li_task' id = '"+json.id+"'>"+
        "<div class='task_block'>"+
          "<div class='task_status_block'>"+ 
            "<input class='task_check_box' type='checkbox' value='"+json.status+"'>"+
          "</div>"+
          "<div class='task_name_deadline'>"+
            "<span class='task_name'>"+json.name+"</span>"+
            "<span class = 'task_span'>deadline:</span>"+
            "<span class='task_deadline'>"+json.deadline+"</span>"+
            "<input class='task_input_text' type='text' update-project-task-path='/projects/"+json.project_id+"/tasks/"+json.id+"'>"+
            "<input class = 'task_input_date' type = 'date'>"+
            "<input class='task_input_button' type='button' value='OK'>"+
          "</div>"+
          "<div class='task_image_block'>"+
            "<a class='delete_task' data-method='delete' data-remote='true' href='/projects/"+json.project_id+"/tasks/"+json.id+"' rel='nofollow'><img alt='6' border='0' class='delete_task_image' src='/assets/delete_task.gif'></a>"+
            "<a class='edit_task' href='/projects/"+json.project_id+"/tasks/"+json.id+"' rel='nofollow' data-remote='true'><img alt='5' border='0' class='edit_task_image' src='/assets/edit_task.gif'></a>"+
          "</div>"+
        "</div>"+
      "</li>"; 
      var task = $(temp);
    
      return task;

    };
    $.post(path, {"task[name]":name, "task[deadline]":deadline}, function(result){
      if (Object.prototype.toString.call(result) == "[object Object]") {
        element.parents(".project_tasks_content").find(".task_list").append(renderTask(result));
      }
    }) 
    return false;
   });

  $('.container').on('click',".edit-project", function() {
    $(this).parents(".project_tasks_content").find('.project_input_text').val($(this).parents(".project_tasks_content").find('.project_name').html());
    $(this).parents(".project_tasks_content").find('.project_input_text').show();
    $(this).parents(".project_tasks_content").find('.project_input_button').show();
    $(this).parents(".project_tasks_content").find('.project_name').hide();
    return false;
  });

  $('.container').on('click',".project_input_button", function() {
    var path = $(this).parents(".project_block").find(".project_input_text").attr("update-project-path");
    var name = $(this).parents(".project_block").find(".project_input_text").val();
    var element = $(this);
    $.ajax({
      type: "patch",
      url: path,
      data: { "project[name]":name}
    }).done(function(data) {
      if (Object.prototype.toString.call(data) == "[object Object]") {
        element.parents(".project_tasks_content").find(".project_name").html(data.name);
      }
    });
    $(this).parents(".project_tasks_content").find('.project_input_text').hide();
    $(this).parents(".project_tasks_content").find('.project_input_button').hide();
    $(this).parents(".project_tasks_content").find('.project_name').show();
    return false;
  });

  $('.container').on('click',".edit_task", function() {
    $(this).parents(".li_task").find('.task_input_text').val($(this).parents(".li_task").find('.task_name').html());
    $(this).parents(".li_task").find(".task_input_date").val($(this).parents(".li_task").find('.task_deadline').html());
    $(this).parents(".li_task").find('.task_input_text').show();
    $(this).parents(".li_task").find('.task_input_button').show();
    $(this).parents(".li_task").find(".task_input_date").show();
    $(this).parents(".li_task").find('.task_name').hide();
    $(this).parents(".li_task").find('.task_deadline').hide();
    $(this).parents(".li_task").find('.task_span').hide();
    return false;
  });

  $('.container').on('click',".task_input_button", function() {
    var path = $(this).parents(".li_task").find(".task_input_text").attr("update-project-task-path");
    var name = $(this).parents(".li_task").find(".task_input_text").val();
    var deadline = $(this).parents(".li_task").find(".task_input_date").val();
    var element = $(this);
    $.ajax({
      type: "patch",
      url: path,
      data: { "task[name]":name, "task[deadline]":deadline }
    }).done(function(data) {
      if (Object.prototype.toString.call(data) == "[object Object]") {
        element.parents(".li_task").find(".task_name").html(data.name);
        element.parents(".li_task").find(".task_deadline").html(data.deadline);
      }
    });
    $(this).parents(".li_task").find('.task_input_text').hide();
    $(this).parents(".li_task").find('.task_input_button').hide();
    $(this).parents(".li_task").find('.task_name').show();
    $(this).parents(".li_task").find('.task_deadline').show();
    $(this).parents(".li_task").find(".task_input_date").hide();
    $(this).parents(".li_task").find(".task_span").show();
    return false;
  });

  $('.container').on('change',".task_check_box", function() {
    var path = $(this).parents(".li_task").find(".task_input_text").attr("update-project-task-path");
    var status = $(this).parents(".li_task").find(".task_check_box").is(':checked');
    $.ajax({
      type: "put",
      url: path,
      data: { "task[status]":status }
    });
    return false;
  });

  function sort_task() {
    $('.task_list').sortable({
      update: function(){ 
        var ordering = $(this).sortable('toArray');
        var path = $(this).attr("path");
        $.ajax({
          type: "post",
          url: path,
          data: { "task":ordering }
        });
      }
    });
    $('.task_list').disableSelection();
  };

  sort_task();

});