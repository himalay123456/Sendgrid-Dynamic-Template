const handleResponse = ({
	result = 1,
	res,
	statusCode=200,
	msg = 'Success',
	data ={} 
}) => {
	var ret = {
		result,
		msg,
	}
	if (data) {
		Object.assign(ret, data)
	}
	return res.status(statusCode).json(ret)
}

const handleError = ({
	result = 0,
	res,
	statusCode = 500,
	err = 'Error',
	err_msg = 'Fail',
	data = {}
 }) => {
	var ret = {
		result,
		err_msg,
		msg: err instanceof Error ? err.message : err.msg || err,
		data,
	}
	if (data) {
		Object.assign(ret, data)
	}
	return res.status(statusCode).json(ret)
}

module.exports = { handleResponse, handleError }