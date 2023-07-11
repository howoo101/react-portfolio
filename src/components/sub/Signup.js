import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Signup() {
	const history = useHistory();
	const initVal = useRef({
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		gender: '',
		hobbys: [],
		edu: '',
		comments: '',
	});
	const [val, setValue] = useState(initVal.current);
	const [Err, setErr] = useState({});
	const [Submit, setSubmit] = useState(false);

	// input 요소,select
	const onChangeValue = (e) => {
		const { name, value } = e.target;
		console.log(name, value);
		setValue({ ...val, [name]: value });
	};

	const onChangeCheck = (e) => {
		const { name } = e.target;

		const checks = [...e.target.parentElement.querySelectorAll('input')]
			.filter((el) => el.checked)
			.map((el) => {
				return el.value;
			});

		setValue({ ...val, [name]: checks });
		console.log(val);
	};

	const onChangeRadio = (e) => {
		const { name, checked } = e.target;
		setValue({ ...val, [name]: checked });
	};
	const validate = (value) => {
		const errs = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()_+]/;
		const regex = /(\W|^)[\w.\-]{0,25}@(naver|daum|gmail)\.com(\W|$)/;

		if (value.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요.';
		}
		if (
			value.pwd1.length < 5 ||
			!eng.test(value.pwd1) ||
			!num.test(value.pwd1) ||
			!spc.test(value.pwd1)
		) {
			errs.pwd1 = '비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함하세요.';
		}
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요.';
		}
		if (!regex.test(value.email)) {
			errs.email = '올바른 이메일 형식이 아닙니다.';
		}
		if (value.gender === '') {
			errs.gender = '성별을 체크해주세요.';
		}
		if (value.hobbys.length === 0) {
			console.log(value.hobbys);
			errs.hobbys = '취미를 체크해주세요.';
		}

		if (value.edu === '') {
			errs.edu = '최종학력을 선택해주세요.';
		}
		if (value.comments.length < 10) {
			errs.comments = '남기는 말을 최소 10글자 이상 입력하세요.';
		}
		return errs;
	};
	const formSubmit = (e) => {
		e.preventDefault();
		setErr(validate(val));
		setSubmit(true);
	};

	// validation체크에서 통과하여 에러메시지가 없으면
	useEffect(() => {
		const len = Object.keys(Err).length;
		if (len === 0 && Submit) {
			alert('모든 인증을 통과했습니다.');
			setValue(initVal);
			history.push('/');
		}
	}, [history, Submit, Err]);

	return (
		<Layout name={'Signup'}>
			<form onSubmit={formSubmit}>
				<fieldset>
					<table>
						<tbody>
							<tr>
								<th scope='row'>
									<label htmlFor='userId'>아이디</label>
								</th>
								<td>
									<input
										type='text'
										name='userid'
										id='userid'
										placeholder='아이디를 입력하세요.'
										onChange={onChangeValue}
										value={val.userid || ''}
									/>
									<br />
									{Err.userid && <p>{Err.userid}</p>}
								</td>
							</tr>

							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>비밀번호</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd1'
										id='pwd1'
										placeholder='비밀번호를 입력하세요.'
										onChange={onChangeValue}
										value={val.pwd1 || ''}
									/>
									<br />
									{Err.pwd1 && <p>{Err.pwd1}</p>}
								</td>
							</tr>
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>비밀번호 확인</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd2'
										id='pwd2'
										placeholder='비밀번호를 재 입력하세요.'
										onChange={onChangeValue}
										value={val.pwd2 || ''}
									/>
									<br />
									{Err.pwd2 && <p>{Err.pwd2}</p>}
								</td>
							</tr>

							<tr>
								<th>
									<label htmlFor='email'>이메일</label>
								</th>
								<td>
									<input
										type='email'
										name='email'
										id='email'
										placeholder='이메일 주소를 입력하세요.'
										onChange={onChangeValue}
										value={val.email || ''}
									/>
									<br />
									{Err.email && <p>{Err.email}</p>}
								</td>
							</tr>

							<tr>
								<th scrope='row'>
									<label htmlFor='edu'>최종학력</label>
								</th>
								<td>
									<select name='edu' id='edu' onChange={onChangeValue}>
										<option value=''>최종학력을 선택해주세요</option>
										<option value='elementary school'>초등학교 졸업</option>
										<option value='middle school'>중학교 졸업</option>
										<option value='high school'>고등학교 졸업</option>
										<option value='college'>대학교 졸업</option>
									</select>
									<br />
									<p>{Err.edu}</p>
								</td>
							</tr>

							<tr>
								<th scope='row'>성별</th>
								<td>
									<label htmlFor='male'>Male</label>
									<input
										type='radio'
										name='gender'
										id='male'
										value='male'
										onChange={onChangeRadio}
									/>

									<label htmlFor='female'>Female</label>
									<input
										type='radio'
										name='gender'
										id='female'
										value='female'
										onChange={onChangeRadio}
									/>
									<br />
									{Err.gender && <p>{Err.gender}</p>}
								</td>
							</tr>

							<tr>
								<th scope='row'>취미</th>
								<td>
									<label htmlFor='sports'>Sports</label>
									<input
										type='checkbox'
										name='hobbys'
										id='sports'
										value='sports'
										onChange={onChangeCheck}
									/>

									<label htmlFor='music'>Music</label>
									<input
										type='checkbox'
										name='hobbys'
										id='music'
										value='music'
										onChange={onChangeCheck}
									/>

									<label htmlFor='game'>Game</label>
									<input
										type='checkbox'
										name='hobbys'
										id='game'
										value='game'
										onChange={onChangeCheck}
									/>

									<label htmlFor='reading'>Reading</label>
									<input
										type='checkbox'
										name='hobbys'
										id='reading'
										value='reading'
										onChange={onChangeCheck}
									/>
									<br />
									{Err.hobbys && <p>{Err.hobbys}</p>}
								</td>
							</tr>

							<tr>
								<th>
									<label htmlFor='comments'>자기소개</label>
								</th>
								<td>
									<textarea
										name='comments'
										id='comments'
										cols='30'
										rows='4'
										placeholder='남기는 글을 입력하세요.'
										maxLength='200'
										onChange={onChangeValue}
									></textarea>
									<br />
									<p>{Err.comments}</p>
								</td>
							</tr>

							<tr>
								<th colSpan='2'>
									<input
										type='reset'
										value='리셋'
										onClick={() => setValue(initVal)}
									/>
									<input type='submit' value='가입' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Signup;
