import { Category } from "./Category";
import { Like } from "./Like";
import { ReportedVideos } from "./ReportedVideos";

export interface UnApprovedVideos {

  // userId: number,
  // firstName: string,
  // lastName: string,
  // commentId: string,
  // commentDesc: string,
  // videoId: number;
  // videoLink:string,
  // videoTitle: string,

videoId: number,
videoDesc: string,
videoLink:string,
isApproved: string,
videoTitle: string,
comment: Array<Comment>,
like: Array<Like>,
reportedVid: Array<ReportedVideos>,
cat: Array<Category>

}

