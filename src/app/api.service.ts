import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})

export class ApiService {
	//API_URL = 'http://sow.webspero.com/callapi_test/';
	API_URL1 = 'http://localhost:3000/';
	//API_URL1 = 'http://192.168.2.19:3000/';
	constructor(private httpClient: HttpClient) { }

///User Schema Api
	forgetPassword(data) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		return this.httpClient.post(this.API_URL1 + 'addUser/frogetPassword', data, { headers: headers });
	}

	checkResetPassword(data, token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return this.httpClient.post(this.API_URL1 + 'addUser/checkResetPassword', data, { headers: headers });
	}

	resetPassword(data, token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return this.httpClient.post(this.API_URL1 + 'addUser/resetPassword', data, { headers: headers });
	}

	createUser(data) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		return this.httpClient.post(this.API_URL1 + 'addUser/createuser', data, { headers: headers });
	}

	getUser(token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return this.httpClient.get(this.API_URL1 + 'addUser/getUserList',  { headers: headers });
	}

	getUserName(token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return this.httpClient.get(this.API_URL1 + 'addUser/getUserNameList',  { headers: headers });
	}

	updateUser(data,token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return this.httpClient.post(this.API_URL1 + 'addUser/updateUser',data,{ headers: headers });
	}

	removeUserFolderRow(id,token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		headers = headers.append('id', id);
		return this.httpClient.delete(this.API_URL1 + 'addUser/removeFolderRow',{ headers: headers });
	}

	deleteUser(ids,token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		//headers = headers.append('id', ids);
		return this.httpClient.post(this.API_URL1 + 'addUser/deleteUser',ids,{ headers: headers });
	}

	loginByEmail(data) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		return this.httpClient.post(this.API_URL1 + 'addUser/login', data, { headers: headers });
	}

	loginByGmail(data) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		return this.httpClient.post(this.API_URL1 + 'addUser/loginGmail', data, { headers: headers });
	}
	
///Folder Schema Api
	createFolder(data,token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return this.httpClient.post(this.API_URL1 + 'addFolder/createFolder',data, { headers: headers });
	}
	getFolder(token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return this.httpClient.get(this.API_URL1 + 'addFolder/getFolderList',  { headers: headers });
	}

	getFolderUser(foldername,token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		headers = headers.append('foldername', foldername);
		return this.httpClient.get(this.API_URL1 + 'addFolder/getFolderUserList',  { headers: headers });
	}
	
	updateFolder(data,token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return this.httpClient.post(this.API_URL1 + 'addFolder/updateFolder',data, { headers: headers });
	}
	removeFolderRow(id,token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		headers = headers.append('id', id);
		return this.httpClient.delete(this.API_URL1 + 'addFolder/removeFolderRow',{ headers: headers });
	}

	deleteFolder(data,token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return this.httpClient.post(this.API_URL1 + 'addFolder/deleteFolder',data,{ headers: headers });
	}

///Folder Schema Api
	createFolderDetails(data,token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('Authorization', 'Bearer ' + token);
		return this.httpClient.post(this.API_URL1 + 'addFolderDetails/createFolderDetails',data,{ headers: headers });
	}
}