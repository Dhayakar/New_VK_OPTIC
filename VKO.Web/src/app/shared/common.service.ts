import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/toPromise';
import { isArray } from 'util';
import { HttpRequest, HttpEvent, HttpClient, HttpHeaders } from '@angular/common/http';
// import { User } from '../Models/UserModels';
declare var $: any;

// Webindia
 //var apiurl = 'http://localhost/API/';

// iis express

//var apiurl = 'https://apps1api.wynkemr.com/';

//Local server

//const apiurl = 'http://localhost:54669/';

//apps.cmps.in

var apiurl = 'https://vkoapi.cmps.in/';

//apps.wynkemr.com

//var apiurl = 'https://myapi.wynkemr.com/';


@Injectable()
export class CommonService<T> {
 apiurl: any;
  constructor(public http: Http, public router: Router, private httpp: HttpClient) {
  }
  data: T;
  listOfData: T[];
  private baseUrl = 'http://localhost:8080';

  public pendingRequests = 0;
  public showLoading = false;

  UploadExcel(formData: FormData) {
    const headers = new Headers({ Authorization: 'Bearer ' });
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const httpOptions = { headers };

    return this.http.post(apiurl + '/UploadExcel', formData, httpOptions);
  }
  // BindUser(): Observable<User[]> {
  //  return this.http.get(apiurl + '/UserDetails')
  //    .map((data: Response) => {
  //    console.log(data);
  //    return data.json();
  //  });
  // }

  removeToken() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  getData(url: string) {
    const token = localStorage.getItem('token');
    const headerOptions = new Headers({ Authorization: 'Bearer ' + token });
    const requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headerOptions });
    return this.http.get(apiurl + url, requestOptions)
      .map((data: Response) => {
        console.log(data);
        return data.json();
      });
  }


  deletedoctor(DoctorID: number, DoctorSpecialityID: number) {

    return this.http.delete(apiurl + 'DoctorMaster/DeleteDoctor/' + DoctorID + '/' + DoctorSpecialityID)
      .do((res: Response) => {
        // console.log("Response: " + res);
      }, (err: any) => {
        this.turnOffModal();
        // console.log("Caught error: " + err);
      })
      .map(x => x.json())
      .finally(() => {
        this.turnOffModal();
      });

  }

  deletedoctor1(DoctorID: number) {

    return this.http.delete(apiurl + 'DoctorMaster/DeleteDoctor1/' + DoctorID)
      .do((res: Response) => {
        // console.log("Response: " + res);
      }, (err: any) => {
        this.turnOffModal();
        // console.log("Caught error: " + err);
      })
      .map(x => x.json())
      .finally(() => {
        this.turnOffModal();
      });

  }

  getListOfData(url: string) {
    this.turnOnModal();

    const token = localStorage.getItem('token');
    const headerOptions = new Headers({ Authorization: 'Bearer ' + token });

    const requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headerOptions });
    return this.http.get(apiurl + url, requestOptions)
      .do((res: Response) => {
        // console.log("Response: " + res);
      }, (err: any) => {
        this.turnOffModal();
        // console.log("Caught error: " + err);
      })
      .map((data: Response) => {
        return data.json();
      })
      .finally(() => {
        this.turnOffModal();
      });
    // .toPromise().then(x => {
    //  //this.listOfData = x;
    //  return x;
    // }).catch((data: Response) => {
    //  if (data.status == 401)
    //    this.removeToken();
    // })
  }

  getPatientImage(url: string): Observable<Blob> {
    return this.http
      .get(apiurl + url, { responseType: ResponseContentType.Blob })
      .map((res: Response) => {
        return res.blob(), res.json();
      });

  }



  postData(url: string, data: T) {
    debugger;
    this.turnOnModal();
    const token = localStorage.getItem('token');
    const body = JSON.stringify(data);
    const headerOptions = new Headers({ 'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post(apiurl + url, body, requestOptions)
      .do((res: Response) => {
        // console.log("Response: " + res);
      }, (err: any) => {
        this.turnOffModal();
        // console.log("Caught error: " + err);
      })
      .map(x => x.json())
      .finally(() => {
        this.turnOffModal();
      });
  }

  putData(url: string, data: T) {
    const token = localStorage.getItem('token');
    const body = JSON.stringify(data);
    const headerOptions = new Headers({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + token });
    const requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(apiurl + url, body, requestOptions)
      .do((res: Response) => {
        // console.log("Response: " + res);
      }, (err: any) => {
        this.turnOffModal();
        // console.log("Caught error: " + err);
      })
      .map(x => x.json())
      .finally(() => {
        this.turnOffModal();
      });
  }

  deleteData(url: string) {
    const token = localStorage.getItem('token');
    const headerOptions = new Headers({ Authorization: 'Bearer ' + token });
    const requestOptions = new RequestOptions({ method: RequestMethod.Delete, headers: headerOptions });
    return this.http.delete(apiurl + url, requestOptions)
      .do((res: Response) => {
        // console.log("Response: " + res);
      }, (err: any) => {
        this.turnOffModal();
        // console.log("Caught error: " + err);
      })
      .map(x => x.json())
      .finally(() => {
        this.turnOffModal();
      });
  }

  postFile(url: string, fileToUpload: File): Observable<boolean> {
    const token = localStorage.getItem('token');
    const headerOptions = new Headers({ Authorization: 'Bearer ' + token });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    const fd = new FormData();
    fd.append('file', fileToUpload, fileToUpload.name);
    return this.http
      .post(apiurl + url, fd, requestOptions)
      .do((res: Response) => {
      }, (err: any) => {
        this.turnOffModal();
      })
      .map(x => x.json())
      .finally(() => {
        this.turnOffModal();
      });
  }

  // upload(file: File): Observable<HttpEvent<any>> {
  //  const formData: FormData = new FormData();

  //  formData.append('file', file);

  //  const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
  //    reportProgress: true,
  //    responseType: 'json'
  //  });

  //  return this.http.request(req);
  // }

  // getFiles(): Observable<any> {
  //  return this.http.get(`${this.baseUrl}/files`);
  // }

  postFiles(url: string, fileToUpload: File): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const headerOptions = new Headers({ Authorization: 'Bearer ' + token });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    return this.http
      .post(apiurl + url, formData)
      .do((res: Response) => {
      }, (err: any) => {
      })
      .map(x => x.json())
      .finally(() => {
      });
  }


  upload(file: File, phonenumber: string, firstname: string, lastname: string, CMPID: string ): Observable<HttpEvent<any>> {
    debugger;
    const token = localStorage.getItem('token');
    const formData: FormData = new FormData();
    const headerOptions = new Headers({ Authorization: 'Bearer ' + token });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    formData.append('file', file);
    const req = new HttpRequest('POST', apiurl + 'Appointment/uploadfileformats/' + phonenumber + '/' + firstname + '/' + lastname + '/' + CMPID, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpp.request(req);
  }

  uploadProfile(file: File, Userid: string, CMPID: string): Observable<HttpEvent<any>> {
    debugger;
    const token = localStorage.getItem('token');
    const formData: FormData = new FormData();
    const headerOptions = new Headers({ Authorization: 'Bearer ' + token });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    formData.append('file', file);
    const req = new HttpRequest('POST', apiurl + 'Appointment/uploadProfilefile/' + Userid + '/' + CMPID, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpp.request(req);
  }
  makeFileRequest(url: string, files: File[]): Observable<boolean> {
    return Observable.create(observer => {
      const formData: FormData = new FormData();
      const token = localStorage.getItem('token');
      const headerOptions = new Headers({ Authorization: 'Bearer ' + token });
      const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
      for (let i = 0; i < files.length; i++) {
        formData.append('uploads[]', files[i], files[i].name);
      }
      return this.http.post(apiurl + url, formData, requestOptions)
        .do((res: Response) => {
          // console.log("Response: " + res);
        }, (err: any) => {
          this.turnOffModal();
          // console.log("Caught error: " + err);
        })
        .map(x => x.json())
        .finally(() => {
          this.turnOffModal();
        });

    });
  }

  postDataWithFile(url: string, data: T) {
    const token = localStorage.getItem('token');
    const headerOptions = new Headers({ Authorization: 'Bearer ' + token });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    const fd = new FormData();
    for (const key in data) {
      const value = String(data[key]);
      if (value != 'undefined') {
        fd.append(key, value);
      }
    }
    return this.http.post(apiurl + url, fd, requestOptions)
      .do((res: Response) => {
        // console.log("Response: " + res);
      }, (err: any) => {
        this.turnOffModal();
        // console.log("Caught error: " + err);
      })
      .map(x => x.json())
      .finally(() => {
        this.turnOffModal();
      });
  }

  postAnonymousData(url: string, data) {
    this.turnOnModal();
    const token = localStorage.getItem('token');
    const body = JSON.stringify(data);
    const headerOptions = new Headers({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + token });
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post(apiurl + url, body, requestOptions)
      .do((res: Response) => {
        // console.log("Response: " + res);
      }, (err: any) => {
        this.turnOffModal();
        // console.log("Caught error: " + err);
      })
      .map(x => x.json())
      .finally(() => {
        this.turnOffModal();
      });
  }


  nameTranslate(name: string, ln: string) {
    debugger;
    const headerOptions = new Headers({
      'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=UTF-8'
    });
    const requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headerOptions });
    return this.http.get('https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' + ln + '&dt=t&q=' + name)
      .do((res: Response) => {
        // console.log("Response: " + res);
      }, (err: any) => {
        this.turnOffModal();
        // console.log("Caught error: " + err);
      })
      .map((data: Response) => {
        return data.json();
      })
      .finally(() => {
        this.turnOffModal();
      });
  }

  private turnOnModal() {
    this.pendingRequests++;
    if (!this.showLoading) {
      this.showLoading = true;
      $('#loader').css('display', 'block');
      // console.log(this.pendingRequests);
    }
    this.showLoading = true;
  }

  private turnOffModal() {
    this.pendingRequests--;
    if (this.pendingRequests <= 0) {
      if (this.showLoading) {
        $('#loader').css('display', 'none');
      }
      this.showLoading = false;
    }
    // console.log(this.pendingRequests);
  }


  deleteReg(M_RegNO: string) {
    return this.http.delete(apiurl + 'RegistrationMaster/DeleteregMas/' + M_RegNO)
      .do((res: Response) => {
        // console.log("Response: " + res);
      }, (err: any) => {
        this.turnOffModal();
        // console.log("Caught error: " + err);
      })
      .map(x => x.json())
      .finally(() => {
        this.turnOffModal();
      });
  }

  DeleteICD(Code: string) {
    debugger;
    return this.http.delete(apiurl + 'IcdMaster/DeleteICD/' + Code)
      .do((res: Response) => {
        // console.log("Response: " + res);
      }, (err: any) => {
        this.turnOffModal();
        // console.log("Caught error: " + err);
      })
      .map(x => x.json())
      .finally(() => {
        this.turnOffModal();
      });

  }


  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
