import { Category } from './Category';
import { Like } from './Like';
import { ReportedComments } from './ReportedComments';
import { ReportedVideos } from './ReportedVideos';
import { Video } from './Video';

export interface UserDetails {
  id: number;
  emailId: string;
  firstName: string;
  lastName: string;
  password: string;
  isadmin: string;
  vidsPosted: Array<Video>;
  comment: Array<Comment>;
  like: Array<Like>;
  reportedCom: Array<ReportedComments>;
  reportedVid: Array<ReportedVideos>;
  cat: Array<Category>;
}
