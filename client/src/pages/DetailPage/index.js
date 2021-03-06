import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LayoutStyle from '../../layout';
import ProductImage from '../../components/ProductImage';
import ProductInfo from '../../components/ProductInfo';
import { Row, Col } from 'antd';
import { DetailStyle } from './style';

const DetailPage = (props) => {
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`api/product/products_by_id?id=${productId}&type=single`).then((response) => {
      if (response.data.success) {
        console.log('products_by_id', response.data);
        setProduct(response.data.product[0]);
      } else {
        console.log('err');
        alert('상품 정보를 가져오지 못했습니다.');
      }
    });
  }, [productId]);

  return (
    <LayoutStyle>
      <DetailStyle>
        <h1>상품 정보</h1>
        <Row>
          <Col lg={12} sm={24}>
            <ProductImage detail={Product.images} />
          </Col>
          <Col lg={12} sm={24}>
            <ProductInfo detail={Product} />
          </Col>
        </Row>
      </DetailStyle>
    </LayoutStyle>
  );
};

export default DetailPage;
