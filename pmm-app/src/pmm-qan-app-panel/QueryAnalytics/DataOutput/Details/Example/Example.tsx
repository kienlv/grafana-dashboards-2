import React, { useEffect, useState } from 'react';
import ExampleService from './Example.service';
import sqlFormatter from 'sql-formatter';

const getExample = (example: string): string =>
  sqlFormatter
    .format(example.toLowerCase())
    .replace('explain', 'EXPLAIN ')
    .replace('  ', ' ');

const Example = props => {
  const { queryId, groupBy, from, to, labels, tables } = props;
  const [examples, setExamples] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await ExampleService.getExample({
          filterBy: queryId,
          groupBy,
          from,
          to,
          labels,
          tables,
        });
        setExamples(result['query_examples']);
      } catch (e) {
        //TODO: add error handling
      }
    })();
  }, [queryId]);

  return (
    <pre>
      {examples &&
        examples.length &&
        examples
          .map(example => example.example)
          .filter(Boolean)
          .map(getExample)}
    </pre>
  );
};

export default Example;
