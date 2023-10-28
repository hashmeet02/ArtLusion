import {useRouter} from 'next/router';
import { Row, Col } from 'react-bootstrap';
import ArtworkCardDetail from '@/components/ArtworkCardDetail'

export default function ArtworkById() {
  const router = useRouter();
  const id = router.query.objectID;
  if (id) {
    return <Row>
      <Col>
        <ArtworkCardDetail objectID={id} />
      </Col>
    </Row>
  }
  return null
  
}