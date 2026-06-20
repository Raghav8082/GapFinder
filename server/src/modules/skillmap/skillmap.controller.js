import { getUserSkillMap, getNodeDetail } from './skillmap.services.js';

export const getMap = async (req, res, next) => {
  try {
    const result = await getUserSkillMap(req.userId, req.params.slug);
    res.json(result);
  } catch (err) { next(err); }
};

export const getNode = async (req, res, next) => {
  try {
    const node = await getNodeDetail(req.params.slug, req.params.nodeId);
    res.json(node);
  } catch (err) { next(err); }
};