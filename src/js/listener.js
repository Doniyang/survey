function sigin(e) {
	var formDOM = document.forms.item(0);
	$.ajax({
		url: 'http://localhost:8080/ease/login.do',
		type: 'POST',
		data: {
			userName: formDOM.userName.value,
			password: formDOM.password.value
		},
		dataType: 'json',
		success: function(data, textStatus) {
			if (data.status === 200) {
				$router.push({
					path: '/topic',
					pageShow: surveys
				});
			}
		},
		error: function(data) {
			console.log(data);
		},
		crossDomain: true
	});
}

function surveys() {
	$.get('http://localhost:8080/ease/survey.do', {}, function(data) {
		console.log(data);
	}, 'json')
}


function create() {
	$router.push({
		path: '/create'
	});
}

function addTopic(e) {
	var data = {
	       answers:[]	
	};
	var ary = $.makeArray(e.offsetParent.offsetParent.elements);
	$.each(ary, function(index, field) {
		if (field.nodeName.toLocaleLowerCase() != 'button') {
			field.name==='answer'?data.answers.push(field.value):data[field.name] = field.value;
		}
	});
                data.answers = JSON.stringify(data.answers);
	$.post('http://localhost:8080/ease/addtopic.do', data, function(json) {
		console.log(json);
	});
}