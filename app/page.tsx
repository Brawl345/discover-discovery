'use client';

import { FormEventHandler, useState } from 'react';
import Fuse, { FuseResult } from 'fuse.js';
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Image,
  InputGroup,
  Row,
  Spinner,
} from 'react-bootstrap';
import { allRealms, Data, getRealmName, Item, Realm } from '@/utils/types';
import { getImageUrl, strOr } from '@/utils/utils';

const fuse = new Fuse([], {
  keys: ['metaTitle'],
  threshold: 0.3,
});

export default function Home() {
  const [realm, setRealm] = useState<Realm>(Realm.DMAX);

  const [dmaxData, setDmaxData] = useState<Data | null>(null);
  const [tlcData, setTlcData] = useState<Data | null>(null);
  const [hgtvData, setHgtvData] = useState<Data | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FuseResult<Item>[] | null>(null);

  const onChangeRealm = (newRealm: Realm) => {
    setRealm(newRealm);
    setQuery('');
    setResults(null);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    let json: Data;
    switch (realm) {
      case Realm.DMAX:
        if (dmaxData) {
          json = dmaxData;
        } else {
          try {
            json = await fetch('https://de-api.loma-cms.com/feloma/page/sendungen/?environment=dmax&v=2').then(
              (respBody) => respBody.json() as Promise<Data>,
            );
            setDmaxData(json);
          } catch (err) {
            setError(err);
            setIsLoading(false);
            return;
          }
        }
        break;
      case Realm.TLC:
        if (tlcData) {
          json = tlcData;
        } else {
          try {
            json = await fetch('https://de-api.loma-cms.com/feloma/page/sendungen/?environment=tlc&v=2').then(
              (respBody) => respBody.json() as Promise<Data>,
            );
            setTlcData(json);
          } catch (err) {
            setError(err);
            setIsLoading(false);
            return;
          }
        }
        break;
      case Realm.HGTV:
        if (hgtvData) {
          json = hgtvData;
        } else {
          try {
            json = await fetch('https://de-api.loma-cms.com/feloma/page/sendungen/?environment=hgtv&v=2').then(
              (respBody) => respBody.json() as Promise<Data>,
            );
            setHgtvData(json);
          } catch (err) {
            setError(err);
            setIsLoading(false);
            return;
          }
        }
        break;
    }

    // @ts-ignore - ???
    fuse.setCollection(json.blocks[0].items);
    const fuseResults = fuse.search(query);

    setResults(fuseResults);
    setIsLoading(false);
  };

  if (error) {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <div className="text-center">
              <h1 className="text-danger">Ein Fehler ist aufgetreten!</h1>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <DropdownButton variant="secondary" title={getRealmName(realm)} id="realm-select">
              {allRealms.map((r) => (
                <Dropdown.Item key={r} onClick={() => onChangeRealm(r)} active={r === realm}>
                  {getRealmName(r)}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <Form.Control
              disabled={isLoading}
              required
              type="search"
              size="lg"
              placeholder="Suche nach einer Serie..."
              aria-label="Suche nach einer Serie"
              aria-describedby="submit-button"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Button disabled={isLoading} variant="primary" id="submit-button">
              Suchen
            </Button>
          </InputGroup>
        </Form>
      </Row>

      {results && results.length === 0 && (
        <Row>
          <Col>
            <p>Nichts gefunden.</p>
          </Col>
        </Row>
      )}

      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Suchen...</span>
        </Spinner>
      )}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
        {results?.map((result) => (
          <Col key={result.item.uid}>
            <div className="img-container">
              <Image alt={result.item.title} className="w-100 h-100" src={getImageUrl(result.item)} />
              <div className="img-overlay">
                <div className="overlay-text">
                  <p>{result.item.title}</p>
                  <p>ID: {strOr(result.item.attributes.showId, '???')}</p>
                </div>
              </div>
            </div>
          </Col>
        ))}

        {/*<Image src="holder.js/171x180" rounded />*/}
      </div>
    </Container>
  );
}
