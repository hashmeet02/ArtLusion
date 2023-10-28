import useSWR from 'swr';
import { useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import Error from 'next/error';
import { Row, Col, Pagination} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ArtworkCard from '@/components/ArtworkCard';

const PER_PAGE=12;

export default function Artwork(props){
  const [page, setPage] = useState(1);
  const [artworkList, setArtworkList] = useState();
  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);
  
  function previousPage() {
    if(page > 1) setPage((prev) => prev - 1);
  }
  function nextPage() {
    if (page < artworkList.length) setPage((prev) => prev + 1);
  }
  useEffect(()=>{
    if(data){
      let results = []
      
      for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
        const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
    }
  },[data])

  if(error)  return (<><Error statusCode={404} /></>)

  if (!artworkList) {
    return null
  }

  if (artworkList.length == 0) {
    return <Card>
      <Card.Body>
        <Card.Title>Nothing Here</Card.Title>
        <Card.Text>
          Try search for something else.
        </Card.Text>
        </Card.Body>
    </Card>
  }

  // Otherwise, loop through array and render cards for each element
  return <>
    <Row className="gy-4">
      {artworkList[page - 1].map((objectID) => {
        return <Col lg={3} key={objectID}>
          <ArtworkCard objectID={objectID} />
          </Col>
        })}
    </Row>
    <br/>
    <Row>
      <Col>
        <Pagination>
          <Pagination.Prev onClick={previousPage} />
          <Pagination.Item>{page}</Pagination.Item>
          <Pagination.Next onClick={nextPage} />
        </Pagination>
      </Col>
    </Row>
  </>
}

