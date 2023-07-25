import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import axios from 'axios';

function Department() {
	const [members, setMembers] = useState([]);

	async function getData() {
		const json = (await axios.get(`${process.env.PUBLIC_URL}/DB/department.json`)).data.members;
		// console.log(json);
		setMembers(json);
	}

	useEffect(() => {
		getData();
	}, []);
	return (
		<Layout name={'Department'}>
			<div className='wrap'>
				{members &&
					members.map((member, idx) => {
						return (
							<article key={idx}>
								<div className='picture'>
									<img
										src={`${process.env.PUBLIC_URL}/imgs/${member.pic}`}
										alt={member.name}
									/>
									<img
										src={`${process.env.PUBLIC_URL}/imgs/${member.pic}`}
										alt={member.name}
									/>
								</div>

								<div className='content'>
									<h2>{member.name}</h2>
									<p>{member.position}</p>
								</div>
							</article>
						);
					})}
			</div>
		</Layout>
	);
}

export default Department;
