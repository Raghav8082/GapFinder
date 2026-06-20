import { LearningPath } from './skillmap.model.js';
import { User } from '../auth/auth.model.js';

// used by the diagnostic flow to validate node ids before calling Claude
export const getPathMap = async (slug) => {
  const path = await LearningPath.findOne({ slug });
  if (!path) throw new Error('Learning path not found');
  return path;
};

// combines LearningPath template + user's nodeStatuses into one enriched array
const mergeNodeData = (path, nodeStatuses) => {
  return path.nodes.map((node) => {
    const userStatus = nodeStatuses[node.id];

    const prereqsMet = node.prerequisites.every(
      (prereqId) => nodeStatuses[prereqId]?.level === 'strong'
    );

    return {
      id: node.id,
      title: node.title,
      position: node.position,
      mastery: userStatus?.mastery ?? 0,
      level: !prereqsMet ? 'locked' : (userStatus?.level || 'not-started'),
    };
  });
};

// powers the map view — lightweight, no subtopics
export const getUserSkillMap = async (userId, pathSlug) => {
  const path = await LearningPath.findOne({ slug: pathSlug });
  if (!path) throw new Error('Learning path not found');

  const user = await User.findById(userId);
  const userPath = user.learningPaths?.find(p => p.pathSlug === pathSlug);
  const nodeStatuses = userPath?.nodeStatuses || {};

  const nodes = mergeNodeData(path, nodeStatuses);
  return { nodes, edges: path.edges };
};

// powers the side panel — heavy, fetched on node click only
export const getNodeDetail = async (pathSlug, nodeId) => {
  const path = await LearningPath.findOne({ slug: pathSlug });
  if (!path) throw new Error('Learning path not found');

  const node = path.nodes.find(n => n.id === nodeId);
  if (!node) throw new Error('Node not found');

  return node; // includes subtopics + resources
};