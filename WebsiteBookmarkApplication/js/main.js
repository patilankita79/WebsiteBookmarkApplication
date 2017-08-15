//listen for Form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e){
	//create variables for form values and get the form values

	//Getting the site name
	 var siteName = document.getElementById('siteName').value;
	 console.log(siteName);
	 //Getting the site URL
	 var siteUrl = document.getElementById('siteUrl').value;
	 console.log(siteUrl);

	 if(!validateForm(siteName, siteUrl)) {
		 return false;
	 }

	 //When we submit to local storage, we will store in array of objects
   //create bookmark object
	 //saving the values in array of object
	 var bookmark = {
		name: siteName,
		url: siteUrl
	 }
	 console.log(bookmark);
/*
	 Now, we have to submit this object to Local Storage
	 Localstorage only stores strings
	 localStorage.setItem('test','Hello World' );
	 console.log(localStorage.getItem('test'));

	 removing from localStorage
	 localStorage.removeItem('test');
*/

	 //Now, we have to submit this object to Local Storage
	 //save the bookmark that we have created in localStorage

	 //first we have to check if bookmark value is there

	 if(localStorage.getItem('bookmarks') === null){
		//initialize an array
		var bookmarks =[];

		//add to array
		bookmarks.push(bookmark);

		//set to LocalStorage, Localstorage only stores strings
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	 } else { //this is if we have something in bookmarks

		 //Get bookmarks from localStorage. It stores strings and  we want JSON.
		 var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

		 //add bookmarks to array
		 bookmarks.push(bookmark);

		 //Reset back to local storage
		 localStorage.setItem('bookmarks', JSON.stringify(bookmarks));


	 }

	 //Clear the form
	 document.getElementById(myForm).reset();

	 //Re-fetch bookmarks
	 fetchBookmarks();

	//Prevent the default behaviour of the form, i.e. Prevent the form from submitting
	e.preventDefault();
}

function deleteBookmark(url) {
	console.log(url);
	//Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//loop through bookmarks
	for (var i = 0; i < bookmarks.length; i++) {
		if(bookmarks[i].url == url) {
			//Remove from an array
			bookmarks.splice(i, 1); //At position i, remove 1 element
		}
	}

	//Reset back to local storage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//Re-fetch bookmarks
	fetchBookmarks();

}


function fetchBookmarks(){
	 // Get bookmarks from localStorage
	 var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	 console.log(bookmarks);

	 //Get output id
	 var bookmarksResults = document.getElementById('bookmarksResults')

	 //Build output
	 bookmarksResults.innerHTML='';

	 //loop through the bookmarks that are in localStorage and display them one by one inside a <div>
	 for(var i = 0; i < bookmarks.length; i++) {
		 var name = bookmarks[i].name;
		 var url = bookmarks[i].url;

		 bookmarksResults.innerHTML += '<div class="well">'+
		 															 '<h3>'+name+
																	 ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
																	 ' <a class="btn btn-danger" onClick="deleteBookmark(\''+url+'\')" href="#">Delete</a> '+
																	 '</h3>'+
																	 '<div>';

	 }

}

//form validations
function validateForm(siteName, siteUrl){
	//form should be submitted only if the values are entered.
	if(!siteName || !siteUrl) {
		alert('Please fill in the form');
		return false;
	}
	//regex url
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)) {
		alert("Enter a valid URL");
		return false;
	}
	return true;
}
