const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "StudentRecords";

exports.handler = async (event) => {
	console.log("event: ", event);
	const method = event.httpMethod;
	const studentId = event?.queryStringParameters?.student_id || null;
	switch (method) {
		case "GET":
			return await getStudent(studentId);
		case "POST":
			return await createStudent(JSON.parse(event.body));
		case "PUT":
			return await updateStudent(JSON.parse(event.body));
		case "DELETE":
			return await deleteStudent(studentId);
		default:
			return {
				statusCode: 405,
				body: JSON.stringify({ message: "Method Not Allowed" }),
			};
	}
};

async function getStudent(student_id) {
	const params = {
		TableName: TABLE_NAME,
		Key: { student_id },
	};
	try {
		const result = await dynamoDb.get(params).promise();
		if (!result.Item) {
			return {
				statusCode: 404,
				body: JSON.stringify({ message: "Student not found" }),
			};
		}
		return {
			statusCode: 200,
			body: JSON.stringify(result.Item),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: "Internal Server Error", error }),
		};
	}
}

async function createStudent(studentData) {
	const { student_id, name, course } = studentData;
	const params = {
		TableName: TABLE_NAME,
		Item: { student_id, name, course },
	};
	try {
		await dynamoDb.put(params).promise();
		return {
			statusCode: 201,
			body: JSON.stringify({ message: "Student created successfully" }),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: "Internal Server Error", error }),
		};
	}
}

async function updateStudent(studentData) {
	const student_id = studentData.student_id;
	if (!student_id) {
		return {
			statusCode: 400,
			body: JSON.stringify({ message: "student_id is required" }),
		};
	}
	let updateExpression = "set";
	let expressionAttributeNames = {};
	let expressionAttributeValues = {};
	if (studentData.name) {
		updateExpression += " #name = :name,";
		expressionAttributeNames["#name"] = "name";
		expressionAttributeValues[":name"] = studentData.name;
	}
	if (studentData.course) {
		updateExpression += " #course = :course,";
		expressionAttributeNames["#course"] = "course";
		expressionAttributeValues[":course"] = studentData.course;
	}
	updateExpression = updateExpression.slice(0, -1);
	const params = {
		TableName: TABLE_NAME,
		Key: { student_id },
		UpdateExpression: updateExpression,
		ExpressionAttributeNames: expressionAttributeNames,
		ExpressionAttributeValues: expressionAttributeValues,
		ReturnValues: "UPDATED_NEW",
	};
	try {
		const result = await dynamoDb.update(params).promise();
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Student updated successfully",
				updatedAttributes: result.Attributes,
			}),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: "Internal Server Error", error }),
		};
	}
}

async function deleteStudent(student_id) {
	const params = {
		TableName: TABLE_NAME,
		Key: { student_id },
	};
	try {
		await dynamoDb.delete(params).promise();
		return {
			statusCode: 200,
			body: JSON.stringify({ message: "Student deleted successfully" }),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: "Internal Server Error", error }),
		};
	}
}
