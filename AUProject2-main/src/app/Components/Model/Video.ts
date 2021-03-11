import { Like } from './Like';
import { Comment } from './Comment';
import { Category } from './Category';
import { ReportedVideos } from './ReportedVideos';

export interface Video {
  videoId: number;
  videoDesc: string;
  videoLink: string;
  videoCategory : string;
  isApproved: string;
  videoTitle: string;
  comment: Array<Comment>;
  like: Array<Like>;
  reportedVid: Array<ReportedVideos>;
  cat: Array<Category>;
}
