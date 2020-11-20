var src;

var btnUrl = document.getElementById('btn-url');
var btnWithDraw = document.getElementById('btn-withdraw');
var btnLogout = document.getElementById('btn-logout');
var btnLiked = document.getElementById('btn-liked');
function onLoadPage() {
	fixInfo();
	if (!localStorage.getItem('url')) {
		$("#user-url-div").show();
		$("#list-post").hide();
	} else {
		$("#user-url-div").hide();
		$("#list-post").show();
		createData();
	}

}

function createData() {


	var links = ["https://www.facebook.com/vietnambusinessinsider/photos/a.327582801301444/734300507296336/",
		"https://www.facebook.com/vietnambusinessinsider/photos/a.327582801301444/746472509412469/",
		"https://www.facebook.com/vietnambusinessinsider/photos/a.327582801301444/746304976095889",
		"https://www.facebook.com/vietnambusinessinsider/photos/a.327582801301444/746300772762976",
		"https://www.facebook.com/vietnambusinessinsider/photos/a.327582801301444/746257959433924",
		"https://www.facebook.com/vietnambusinessinsider/photos/a.327582801301444/745693049490415",
		"https://www.facebook.com/vietnambusinessinsider/photos/a.327582801301444/745392179520502/"];

	var authors = ['Tan Tran M.', 'Thuan Phan', 'Nguyen N. Tien', 'Nhan NT', 'Phan D Tue'];

	var titles = ["Trận chiến dừa đóng hộp", "Air Asia Nhật Bản phá sản", "Gojek tăng trương 10% ", "Iphone 12 liên tục gặp lỗi",
		"Google bị kiện", "Bkav xuất khẩu camera an ninh qua Mĩ", "Grab đầu tư vào start up fintech"];

	var listPost = links.map((link, index) => {
		var i = index;
		let author = authors[Math.floor(Math.random() * authors.length)];
		var obj = {
			link: link,
			author: author,
			credit: Math.floor(Math.random() * 20 + 7),
			title: titles[i]
		}
		return obj;
	})
	console.log(listPost);
	//console.log(listPost[3].author);

	for (var i = 0; i < listPost.length; i++) {
		drawPost(listPost[i], i);
	}

	openPopUp();


	// create liked list in local storage 
	var arr = [];
	localStorage.setItem('likedList', JSON.stringify(arr));
}
function createElementCustom(tag, className) {
	//   console.log("Start create a element");
	var element = document.createElement(tag);
	for (var i = 0; i < className.length; i++) {
		element.classList.add(className[i]);
	}
	return element;
}


function drawPost(obj, index) {

	let divWrap = createElementCustom('div', ['wrap-card', 'col-sm-6', 'col-lg-4', 'post']);

	let divCard = createElementCustom('div', ['card']);
	divCard.id = "card" + index;
	let divCardBody = createElementCustom('div', ['card-body', 'text-center']);
	let h4 = createElementCustom('h4', ['card-title', 'lesson-title']);
	h4.innerHTML = obj.title;

	let details = createElementCustom('div', ['row', 'px-0', 'mb-3']);

	let h5 = createElementCustom('h5', ['col-sm-7', 'creator']);
	h5.innerHTML = obj.author;
	let h5Credit = createElementCustom('h5', ['col-sm-5', 'text-right', 'subject']);
	h5Credit.innerHTML = obj.credit + " points";

	let link = createElementCustom('button', ['btn', 'btn-primary', 'mx-auto', 'link-post']);
	//link.href = obj.link;
	link.setAttribute("data-link", obj.link);
	link.setAttribute("data-credit", obj.credit);
	link.setAttribute("data-index", index);
	//link.target = "_blank";
	link.innerHTML = "Like ngay";

	details.appendChild(h5);
	details.appendChild(h5Credit);

	divCardBody.appendChild(h4);
	divCardBody.appendChild(details);
	divCardBody.appendChild(link);

	divCard.appendChild(divCardBody);
	divWrap.appendChild(divCard);
	document.getElementById("list-post").appendChild(divWrap);
}

function drawLikedList() {
	document.getElementById('div-liked-post').innerHTML = "";
	var list = JSON.parse(localStorage.getItem("likedList"));
	for (var i = 0; i < list.length; i++) {
		drawAlogActivity(list[i]);
	}

}
function drawAlogActivity(obj) {
	let div = createElementCustom('div', ['row', 'px-0', 'mb-3']);
	let divL = createElementCustom('div', ['col-sm-4']);
	let a = createElementCustom('a', ['aaa']);
	a.href = obj.link;
	a.innerHTML = "Like post";
	a.target = "_blank";
	divL.appendChild(a);
	let divR = createElementCustom('div', ['col-sm-8']);
	divR.innerHTML = obj.time;
	div.appendChild(divL);
	div.appendChild(divR);
	document.getElementById('div-liked-post').appendChild(div);

}
function openPopUp() {
	var links = document.getElementsByClassName("link-post");
	Array.from(links).forEach(function (element) {
		element.addEventListener('click', (src) => {
			console.log("haha" + src.target.dataset.link);
			var w = 1200;
			var h = 900;
			var left = (screen.width / 2) - (w / 2);
			var top = (screen.height / 2) - (h / 2);
			setTimeout(addPoint, 7000, src.target.dataset.credit);
			$("#card" + src.target.dataset.index + " button").attr('disabled', 'disabled');
			$("#card" + src.target.dataset.index + " button").html("Liked !");

			var list = JSON.parse(localStorage.getItem("likedList"));
			var obj = {
				link: src.target.dataset.link,
				time: new Date().toLocaleString()
			}
			list.push(obj);
			localStorage.setItem('likedList', JSON.stringify(list));
			return window.open(src.target.dataset.link, "", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
			//window.open(src, "", "width=600,height=600");
		});

	});


}

function fixInfo() {
	$("#user-name").html("Welcome " + localStorage.getItem('user'));
	localStorage.setItem('credit', '30');
	$("#credit").html(localStorage.getItem('credit') + " points");
	localStorage.setItem('money', '30000');
	$("#money-title").html(localStorage.getItem('money'));
	$("#money").html(localStorage.getItem('money'));

	$("#amount-money").attr({
		"max": parseInt(localStorage.getItem('money')),        // substitute your own
		"min": 0          // values (or variables) here
	});

	$("#err").hide();
}

function addPoint(mark) {
	var point = parseInt(localStorage.getItem('credit')) + parseInt(mark);
	localStorage.setItem('credit', point);
	localStorage.setItem('money', point * 1000);

	$("#credit").html(localStorage.getItem('credit') + " points");
	$("#money-title").html(localStorage.getItem('money'));
	$("#money").html(localStorage.getItem('money'));

	$("#amount-money").attr({
		"max": parseInt(localStorage.getItem('money')),        // substitute your own
		"min": 0          // values (or variables) here
	});

}


btnWithDraw.addEventListener('click', () => {
	checkWithDraw();

})
// btnLogout.addEventListener('click', () => {
// 	localStorage.clear();
// 	location.replace("index.html");

// })

btnLiked.addEventListener('click', () => {

	drawLikedList();
})
btnLogout.addEventListener('click', () => {

	FB.logout(() => {
		localStorage.clear();
		location.replace("index.html");
	});
})
btnUrl.addEventListener('click', () => {
	var url = $("#url-fb").val();
	if (url.length > 10) {
		localStorage.setItem('url', url);
		$("#user-url-div").hide();
		$("#list-post").show();
		createData();
	} else {
		document.getElementById('url-fb').setCustomValidity("Invalid Facbook Url");
		console.log("aaaa");
	}

})
function checkWithDraw() {
	let amount = parseInt($("#amount-money").val());
	let money = parseInt(localStorage.getItem('money'));
	if (amount > money) {
		console.log("exceed");
		$("#err").show();
		setTimeout(function () {
			$("#err").hide();
		}, 3000);
	} else {
		addPoint(- Math.floor(amount / 1000));
		$('#exampleModalCenter').modal('hide');

	}
}
