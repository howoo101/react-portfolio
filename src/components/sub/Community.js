import Layout from '../common/Layout';
import { useEffect, useRef, useState } from 'react';

function Community() {
	const nextId = useRef(1);
	const title = useRef(null);
	const content = useRef(null);

	const [posts, setPosts] = useState([]);
	const [inputs, setInputs] = useState({
		title: '',
		content: '',
	});

	const onReset = () => {
		title.current.value = '';
		content.current.value = '';

		setInputs({ title: '', content: '' });

		title.current.focus();
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	};

	const createPost = () => {
		if (!title.current.value.trim() || !content.current.value.trim()) {
			return alert('제목과 본문을 모두 입력하세요.');
		}
		const newPost = {
			id: nextId.current,
			title: inputs.title,
			content: inputs.content,
		};

		setPosts([{ ...newPost }, ...posts]);
		nextId.current += 1;

		onReset();
	};

	const deletePost = (deleteIdx) => {
		if (!window.confirm('해당 게시글을 삭제하겠습니까?')) return;

		setPosts(posts.filter((post) => post.id !== deleteIdx));
	};

	useEffect(() => {
		console.log(posts);
	}, [posts, inputs]);

	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요.' name='title' onChange={onChange} ref={title} />
				<br />
				<textarea
					cols='30'
					rows='3'
					placeholder='본문을 입력하세요.'
					name='content'
					onChange={onChange}
					ref={content}
				></textarea>
				<br />

				<nav className='btnSet'>
					<button onClick={onReset}>리셋</button>
					<button onClick={createPost}>작성</button>
				</nav>
			</div>
			<div className='showBox'>
				{posts?.map((post, idx) => {
					return (
						<article key={idx}>
							<div className='txt'>
								<h2>{post.title}</h2>
								<p>{post.content}</p>
							</div>
							<nav className='btnSet'>
								<button>EDIT</button>
								<button onClick={() => deletePost(post.id)}>DELETE</button>
							</nav>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
