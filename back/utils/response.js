function ResponseLoginFailure(dt){
   return { 
		 "status": false,
		 "responseCode" : 500,
		 'message' : dt,
		 "error" : dt,
	};
}

function ResponseLoginSuccess(dataUser, token){
	delete dataUser.password;
	delete dataUser.last_token;
   	return { 
		 "status": true,
		 "responseCode" : 200,
		 'message' : 'Login success',
		 "user" : dataUser,
		 "token" : token
	};
}

function ResponseLogoutSuccess(dt){
	return { 
				"status": true,
				"responseCode" : 201,
				"refreshToken" : dt
		 };
}

function ResponseLogoutFailure(dt){
	return { 
				"status": false,
				"responseCode" : 400,
				"error" : dt,
		 };
}

function cekPaggingNumeric(dt){
   return { 
		 "status": false,
		 "responseCode" : 400,
		 "message" : "page or per_page should be numeric"
	};
}

function ResponseGetSuccess(dt){
   return { 
		 "status": true,
		 "responseCode" : 200,
		 "message" : "Data successfully displayed",
		 "total" : dt.total,
		 "pageIndex" : dt.pageIndex,
		 "pageSize" : dt.pageSize,
		 "data" : dt.data
	};
}

function ResponseGetFailure(){
   return { 
		 "status": false,
		 "responseCode" : 400,
		 "message" : 'Failed Data displayed',
		 "totalData" : 0,
		 "data" : []
	};
}

function ResponsePOSTSuccess(dt){
   return { 
				 "status": true,
				 "responseCode" : 201,
				 "message" : "Data successfully saved",
				 "data" : dt
			};
}

function ResponsePOSTFailure(dt){
   return { 
				 "status": false,
				 "responseCode" : 400,
				 'message' : 'Data failed to save',
				 "error" : dt,
			};
}

function ResponseDELETESuccess(dt){
   return { 
				 "status": true,
				 "responseCode" : 200,
				 "message" : "Data deleted successfully",
				 "data" : dt
			};
}

function ResponseDELETEFailure(dt){
   return { 
				 "status": false,
				 "responseCode" : 400,
				 "message" : dt,
			};
}


function ResponseValidatorFailure(dt){
	return { 
		  "status": false,
		  "responseCode" : 400,
		  "error" : dt,
	 };
}

exports.ResponseLoginFailure = ResponseLoginFailure;
exports.ResponseValidatorFailure = ResponseValidatorFailure;
exports.ResponseLoginSuccess = ResponseLoginSuccess;
exports.cekPaggingNumeric = cekPaggingNumeric;
exports.ResponseLogoutSuccess = ResponseLogoutSuccess;
exports.ResponseLogoutFailure = ResponseLogoutFailure;

exports.ResponseGetSuccess = ResponseGetSuccess;
exports.ResponseGetFailure = ResponseGetFailure;
exports.ResponsePOSTSuccess = ResponsePOSTSuccess;
exports.ResponsePOSTFailure = ResponsePOSTFailure;
exports.ResponseDELETESuccess = ResponseDELETESuccess;
exports.ResponseDELETEFailure = ResponseDELETEFailure;
