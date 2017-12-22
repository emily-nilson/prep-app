import TOPICS from 'components/explore-dataset-filters/data/topics.json';
import GEOGRAPHIES from 'components/explore-dataset-filters/data/geographies.json';
import DATATYPES from 'components/explore-dataset-filters/data/data-types.json';

class DatasetFilterService {
  static getTopics() {
    return new Promise(resolve => resolve({ topics: TOPICS }));
  }
  static getGeographies() {
    return new Promise(resolve => resolve({ geographies: GEOGRAPHIES }));
  }
  static getDataTypes() {
    return new Promise(resolve => resolve({ dataTypes: DATATYPES }));
  }
}

export default DatasetFilterService;