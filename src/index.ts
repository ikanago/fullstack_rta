import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    const post = orm.em.create(Post, { title: "Hoge" });
    await orm.em.persistAndFlush(post);
    const posts = await orm.em.find(Post, {});
    console.log(posts);
};

main().catch((err) => {
    console.error(err);
});
