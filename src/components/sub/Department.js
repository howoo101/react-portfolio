import Layout from '../common/Layout';

import { useSelector } from 'react-redux';

function Department() {
	const members = useSelector((store) => store.memberReducer);

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
