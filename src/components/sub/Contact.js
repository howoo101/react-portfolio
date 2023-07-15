import Layout from '../common/Layout';
import { config } from '../../asset/apikey';
import emailjs from '@emailjs/browser';
import { useEffect, useMemo, useRef, useState } from 'react';

function Contact() {
	const container = useRef(null);
	const { kakao } = window;
	// 실시간 교통정보
	const [traffic, setTraffic] = useState(false);
	// 위치정보
	const [location, setLocation] = useState(null);
	//  위치정보별 버튼클릭시 해당 위치 순번
	const [index, setIndex] = useState(0);

	const info = useRef([
		{
			title: '크래프톤',
			position: new kakao.maps.LatLng(37.503542, 127.04162),
		},
		{
			title: '컴투스',
			position: new kakao.maps.LatLng(37.477008, 126.882333),
		},
		{
			title: '카카오본사',
			position: new kakao.maps.LatLng(33.450701, 126.570667),
		},
	]);

	const marker = useMemo(() => {
		return new kakao.maps.Marker({
			position: info.current[index].position,
		});
	}, [index, kakao]);
	useEffect(() => {
		// 지도 인스턴스 중첩문제 해결
		container.current.innerHTML = '';
		const mapInstance = new kakao.maps.Map(container.current, {
			center: info.current[index].position,
			level: 3,
		});
		marker.setMap(mapInstance);
		//지도인스턴스에 타입, 줌 컨트롤 추가
		mapInstance.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPLEFT);
		mapInstance.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.LEFT);
		setLocation(mapInstance);
		//지도영역에 휠 기능 비활성화
		mapInstance.setZoomable(false);
		const setCenter = () => {
			mapInstance.setCenter(info.current[index].position);
		};
		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [index, kakao, marker]);

	useEffect(() => {
		traffic
			? location?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: location?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [traffic, location, kakao]);

	// kakao

	// emailJS
	const form = useRef(null);
	const [success, setSuccess] = useState(false);
	const sendEmail = () => {
		// service ID, template ID
		emailjs
			.sendForm(
				config.emailApiSetviceId,
				config.emailTemplateId,
				form.current,
				config.emailApiPublicKey
			)
			.then(
				(result) => {
					console.log('SUCCESS!');
					alert('이메일이 성공적으로 전송되었습니다!');
				},
				(error) => {
					console.log('FAILED...', error.text);
					setSuccess(false);
					alert('이메일이 전송이 실패했습니다,,,,');
				}
			);
	};
	return (
		<Layout name={'Contact'}>
			<div className='map-wrap'>
				<div id='map' ref={container}></div>
				<ul className='branch'>
					{info.current.map((el, idx) => {
						return (
							<li key={idx} onClick={() => setIndex(idx)}>
								{el.title}
							</li>
						);
					})}
				</ul>
				<button className='btnToggle' onClick={() => setTraffic(!traffic)}>
					{traffic ? '교통정보 ON' : '교통정보 OFF'}
				</button>
			</div>
			<h2>Contact Us</h2>
			<div className='contact-form'>
				<form id='form' ref={form} onSubmit={sendEmail}>
					<input type='hidden' name='contact_number' />
					<div className='row'>
						<div className='input-group'>
							<label htmlFor='userName'>이름</label>
							<input
								type='text'
								name='user_name'
								id='userName'
								placeholder='이름을 입력해 주세요'
							/>
						</div>
						<div className='input-group'>
							<label htmlFor='userEmail'>이메일</label>
							<input
								type='email'
								name='user_email'
								id='userEmail'
								placeholder='이메일을 입력해주세요'
							/>
						</div>
					</div>
					<div className='input-group'>
						<label htmlFor='message'>메시지</label>
						<textarea
							name='message'
							id='message'
							cols='30'
							rows='10'
							placeholder='메시지를 입력해주세요'
						></textarea>
					</div>
					<div className='input-group'>
						<button id='submit' type='submit'>
							보내기
						</button>
					</div>
				</form>
			</div>
		</Layout>
	);
}

export default Contact;
