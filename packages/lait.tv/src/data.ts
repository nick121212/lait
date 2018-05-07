// import { UserTagModel } from './models/entities/usertag';
import { UserModel, UserAuthModel, TagModel, PostModel, CategoryModel, CommentModel } from "./models/index";


const user = async (con) => {
    let user = con.getRepository(UserModel);
    // let auth = con.getRepository(UserAuthModel);

    let userInfo = await user.findOne({
        where: {
            nickname: "老铁精选"
        }
    });

    if (!userInfo) {
        userInfo = await user.create({
            nickname: "老铁精选",
        });
        await user.save([userInfo]);
    }

    let userInfo1 = await user.findOne({
        where: {
            nickname: "深夜精选"
        }
    });

    if (!userInfo1) {
        userInfo1 = await user.create({
            nickname: "深夜精选",
        });
        await user.save([userInfo1]);
    }


    return userInfo;
}

const cate = async (con) => {
    let tag = con.getRepository(TagModel);
    let category = con.getRepository(CategoryModel);

    let cateInfo = await category.findOne({
        where: {
            name: "老铁精选"
        }
    });

    console.log(cateInfo);

    if (!cateInfo) {
        cateInfo = await category.create({
            name: "老铁精选",
            avatar: "",
            description: "老铁精选"
        });
        await category.save([cateInfo]);

        await tag.save([await tag.create({
            name: "美腿",
            avatar: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1519614462&di=47590372add4592ce115842a79bb6c7c&src=http://img3.duitang.com/uploads/item/201410/24/20141024144756_rUCUh.thumb.700_0.jpeg",
            description: "",
            category: cateInfo
        }), await tag.create({
            name: "衣服",
            avatar: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=47204211,741684885&fm=27&gp=0.jpg",
            description: "",
            category: cateInfo
        })]);
    }
}

const comment = async (con, user, postInfo) => {
    let comment = con.getRepository(CommentModel);

    let commentInfo = await comment.create({
        content: "这个是一个评论",
        user: user,
        post: postInfo
    });

    await comment.save([commentInfo]);
}

export default async (con) => {
    await cate(con);
    await user(con);

    // let postInfo = await post.create({
    //     originUrl: "http://www.baidu.com",
    //     coverImage: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=982308500,1286798198&fm=27&gp=0.jpg",
    //     title: "测试文章1",
    //     content: "测试文章1的内容",
    //     images: ["https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=982308500,1286798198&fm=27&gp=0.jpg",
    //         "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517818007262&di=5ac5b6c1024dd2b89a7fbb080d592ba6&imgtype=0&src=http%3A%2F%2Fimage.tianjimedia.com%2FuploadImages%2F2014%2F220%2F11%2FFKVT7X4236D0.jpg",
    //         "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517818007262&di=951f6917a62b405906357d2322851706&imgtype=0&src=http%3A%2F%2Fimg0.ph.126.net%2F7bIT_NCim6k-27mNeR64pg%3D%3D%2F6619529490676590660.jpg",
    //         "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517818007262&di=3a748ed52a58d508aa71c48f0161b9fd&imgtype=0&src=http%3A%2F%2Fpic16.photophoto.cn%2F20100714%2F0036036819358690_b.jpg",
    //         "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517818007262&di=952c3c3356224140c5bf2d05c637d6f7&imgtype=0&src=http%3A%2F%2Fimage.3761.com%2Fweiwei%2F20170309%2F2017030909582012527.jpg"].join("--------"),
    //     video: "http://pcad.video.baidu.com/cooper_video_03e168f71eb2f29b4f0e1ee77792ce6b.mp4?authorization=bce-auth-v1%2Fc308a72e7b874edd9115e4614e1d62f6%2F2017-09-20T09%3A11%3A07Z%2F-1%2F%2F12e5e3e1d912fe3699a924bf1f33ba2d33e806f44a5596e2a8f7c246022321ce&responseCacheControl=max-age%3D8640000&responseExpires=Fri%2C%2029%20Dec%202017%2017%3A11%3A07%20GMT&_=1517808045007",
    //     tag: tagInfo
    // });

    // await post.save(postInfo);
    // await comment(con, userInfo, postInfo);
    // await userTags(con, userInfo, tagInfo);
}