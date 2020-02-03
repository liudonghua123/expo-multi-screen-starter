import list from './list.json';
import item from './item.json';
import itemfj from './itemfj.json';

const items = list.aaData;

export default {
  '/asjyj/findPageQbSwxszbsStr.do': (req, res) => {
    const { iDisplayLength = items.length, iDisplayStart = 0 } = req.query;
    const aaData = [...items].splice(iDisplayStart, iDisplayLength);
    const data = {
      ...list,
      aaData,
      iTotalDisplayRecords: aaData.length,
      iTotalRecords: items.length
    };
    res.json(data);
  },

  '/asjyj/findOneVQbSwxszbStr.do': (req, res) => {
    res.json(item);
  },

  '/asjyj/findVQbSwxszbfjStr.do': (req, res) => {
    res.json(itemfj);
  }
};
