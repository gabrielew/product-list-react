import React, { useState, useEffect } from "react";
import api from "../../services/api";

import { Link } from "react-router-dom";

import "./styles.css";

const getProduct = async (setContent, props) => {
	const { id } = props.match.params;
	const res = await api.get(`/products/${id}`);

	setContent(res.data);
};

const Product = props => {
	const [content, setContent] = useState({});

	useEffect(() => {
		getProduct(setContent, props);
	}, []);

	return (
		<div className="product-info">
			<h1>{content.title}</h1>
			<p>{content.description}</p>
			<p>
				URL:
				<a href={content.url} target="blank">
					{content.url}
				</a>
			</p>
			<div className="actions">
				<Link to={`/`}>
					<button>Voltar</button>
				</Link>
			</div>
		</div>
	);
};

export default Product;
