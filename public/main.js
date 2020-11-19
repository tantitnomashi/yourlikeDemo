var src;
function createData() {

	fixInfo();
	var links = ["https://www.facebook.com/vietnambusinessinsider/photos/a.327582801301444/734300507296336/",
		"https://www.facebook.com/vietnambusinessinsider/photos/a.327582801301444/746472509412469/",
		"https://www.facebook.com/vietnambusinessinsider/photos/a.327582801301444/746304976095889",
		"https://www.facebook.com/vietnambusinessinsider/photos/a.327582801301444/746300772762976",
		"https://www.facebook.com/vietnambusinessinsider/photos/a.327582801301444/746257959433924",
		"https://www.facebook.com/vietnambusinessinsider/photos/a.327582801301444/745693049490415",
		"https://www.facebook.com/vietnambusinessinsider/photos/a.327582801301444/745672452825808"];

	var authors = ['Tan Tran M.', 'Thuan Phan', 'Nguyen N. Tien', 'Nhan NT', 'Phan D Tue'];

	var titles = ["Trận chiến dừa đóng hộp", "Trịnh Văn Quyết muốn mua thêm cổ phiếu", "Apple ra mắt Iphone mới", "Bkav xuất khẩu camera",
		"Kỷ luật và sự tự do", "Starbuck đóng 200 cửa hàng", "Oreo xây dựng hầm tận thế"];

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
		drawPost(listPost[i]);
	}

	openPopUp();
}
function createElementCustom(tag, className) {
	//   console.log("Start create a element");
	var element = document.createElement(tag);
	for (var i = 0; i < className.length; i++) {
		element.classList.add(className[i]);
	}
	return element;
}


function drawPost(obj) {

	/** 
	 * <div class="wrap-card col-sm-6 col-lg-4">
						<div id="#" class="card">
							<div class="card-body">
								<h4 id="" class="card-title lesson-title ">IQ Math: Find Prime Number</h4>
								<div class="row px-0 mb-3">
									<h5 id="author" class="col-sm-7 creator">Tran M. Tan</h5>
									<h5 id="subject" class="col-sm-5 text-right subject">Math </h5>
								</div>
								<a id="like-now" target="_blank" href="waiting.html" class="btn btn-primary float-left">Like
									now</a>
	
							</div>
						</div>
					</div>
	 */

	let divWrap = createElementCustom('div', ['wrap-card', 'col-sm-6', 'col-lg-4', 'post']);
	let divCard = createElementCustom('div', ['card']);
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

var btnWithDraw = document.getElementById('btn-withdraw');
var btnLogout = document.getElementById('btn-logout');
btnWithDraw.addEventListener('click', () => {
	checkWithDraw();
	$('#exampleModalCenter').modal('hide');

})
btnLogout.addEventListener('click', () => {
	localStorage.clear();
	location.replace("index.html");
})
function checkWithDraw() {
	let amount = parseInt($("#amount-money").val());
	let money = parseInt(localStorage.getItem('money'));
	if (amount > money) {
		document.getElementById('#amount-money').setCustomValidity("Exceed the balance !");
	}
	addPoint(- Math.floor(amount / 1000));
}
