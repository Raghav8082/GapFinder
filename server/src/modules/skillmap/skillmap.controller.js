import { getUserSkillMap, getNodeDetail, enrollInPath } from './skillmap.services.js';

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

export const enroll = async (req, res, next) => {
  try {
    const result = await enrollInPath(req.userId, req.params.slug);
    res.status(200).json(result);
  } catch (err) { next(err); }
};