/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './BookGenres.scss';
import axios from 'axios';
import useDataApi from '@root/hooks/useDataApi';
import { apiVersion, basePath } from '@root/api/config';
import useAuth from '@root/hooks/useAuth';

const BookGenres = () => {
	const { user: { token } } = useAuth();
	const [{ data }, fetchData] = useDataApi({ url: `${basePath}/${apiVersion}/genderBook`, headers: {
		Authorization: token
	} });
	const [
		{ data: responseSave },
		fetchDataSaveGender
	] = useDataApi({ url: `${basePath}/${apiVersion}/genderBook`, headers: {
		Authorization: token,
	} });
	const [
		{ data: responseUpdate },
		fetchDataUpdateGender
	] = useDataApi({ url: `${basePath}/${apiVersion}/genderBook`, headers: {
		Authorization: token,
	} });

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const saveGender = async (data) => {
		await fetchDataSaveGender({
			body: data,
			method: 'POST',
		});

		await getGenders();
	};

	const getGenders = async () => {
		await fetchData();
	};

	const updateGender = (idGender) => async (data) => {
		await fetchDataUpdateGender({
			url: `${basePath}/${apiVersion}/genderBook/${idGender}`,
			body: data,
			method: 'PUT',
		});
		await getGenders();
	};

	useEffect(() => {
		getGenders();
	}, []);

	return (
		<Col>
			<FormBookGenres
				action='save'
				onAction={saveGender}
			/>
			{data?.ReturnData.map(({ gender, color, _id }, i) => (
				<FormBookGenres
					key={i}
					defaultData={{ gender, color }}
					action='update'
					onAction={updateGender(_id)}
				/>
			))}
		</Col>
	);
};

const FormBookGenres = ({ defaultData = {}, action = 'save', onAction }) => {
	const [form] = Form.useForm();

	return (
		<Form
			form={form}
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 24 }}
			onFinish={(data) => {
				if (action === 'save') form.resetFields();
				onAction(data);
			}}
			initialValues={defaultData}
		>
			<Form.Item
				label='Gender name'
				name='gender'
				rules={[
					{
						required: true,
						message: 'Please input your gender name!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label='Gender color'
				name='color'
				type='color'
				rules={[
					{
						required: true,
						message: 'Please input your gender!',
					},
				]}
			>
				<Input type='color' />
			</Form.Item>

			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Button type='primary' htmlType='submit'>
					{action === 'save' ? 'Save' : 'Update'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default BookGenres;
