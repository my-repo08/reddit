import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import moment from "moment";
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Icon,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
} from "react-icons/io5";
import { Post } from "../../atoms/postsAtom";
import CustomAlert from "./CustomAlert";

interface PostItemProps {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (
    evt: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  homePage?: boolean;
}

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
  homePage,
}) => {
  const router = useRouter();

  const [isAlertOpen, setAlertOpen] = useState(false);

  const handleAlertOpen = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    setAlertOpen(true);
  };

  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState("");

  const singlePostPage = !onSelectPost;

  //independent for each post item
  const handleDelete = async () => {
    setLoadingDelete(true);

    try {
      const success = await onDeletePost(post);
      if (!success) {
        throw new Error("Failed to delete the post");
      }

      if (singlePostPage) {
        router.push(`/r/${post.communityId}`);
      }
    } catch (error: any) {
      setError(error.message);
    }
    setLoadingDelete(false);
  };

  return (
    <Flex
      border={singlePostPage ? "none" : "1px solid lightgray"}
      bg="white"
      borderRadius={singlePostPage ? "4px 4px 0px 0px" : "4px"}
      _hover={{ border: singlePostPage ? "none" : "1px solid #718096" }}
      cursor={singlePostPage ? "unset" : "pointer"}
      onClick={() => onSelectPost && onSelectPost(post)}
    >
      <Flex
        direction="column"
        align="center"
        bg={singlePostPage ? "none" : "gray.100"}
        p={2}
        width="40px"
        borderRadius={singlePostPage ? "0" : "3px 0px 0px 3px"}
      >
        <Icon
          as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          _hover={{ color: userVoteValue === 1 ? "none" : "gray.500" }}
          onClick={(evt) => onVote(evt, post, 1, post.communityId)}
        />
        <Text fontSize="9pt" fontWeight={600} color="gray.800">
          {post.voteStatus}
        </Text>
        <Icon
          as={userVoteValue === -1 ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          _hover={{ color: userVoteValue === -1 ? "none" : "gray.500" }}
          onClick={(evt) => onVote(evt, post, -1, post.communityId)}
        />
      </Flex>
      <Flex direction="column" width="100%">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text mr={2} color="gray.800">
              {error}
            </Text>
          </Alert>
        )}
        <Stack spacing={1} p="10px">
          <Stack
            direction={{ base: "column", md: "row" }}
            align={{ base: "flex-start", md: "center" }}
            spacing={0.6}
            fontSize="9pt"
          >
            {homePage && (
              <Flex align="center">
                {post.communityImageURL ? (
                  <Image
                    borderRadius="full"
                    boxSize="18px"
                    mr={2}
                    objectFit="cover"
                    alt="logo"
                    src={post.communityImageURL}
                  />
                ) : (
                  <Icon as={FaReddit} fontSize="18pt" mr={1} color="blue.500" />
                )}
                <Link href={`r/${post.communityId}`}>
                  <Text
                    fontWeight={700}
                    color="gray.800"
                    _hover={{ textDecoration: "underline" }}
                    onClick={(evt) => evt.stopPropagation()}
                  >
                    {`r/${post.communityId}`}
                  </Text>
                </Link>
                <Icon
                  as={BsDot}
                  color="gray.500"
                  fontSize={8}
                  display={{ base: "none", md: "unset" }}
                />
              </Flex>
            )}
            <Text color="gray.500">
              Posted by u/{post.creatorDisplayName}{" "}
              <Icon as={BsDot} color="gray.500" fontSize={8} />
              {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize="12pt" fontWeight={600} color="gray.800">
            {post.title}
          </Text>
          <Text fontSize="10pt" color="gray.800">
            {post.body}
          </Text>
          {post.imageURL && (
            <Flex justify="center" align="center" p={2}>
              {loadingImage && <Skeleton height="200px" width="100%" borderRadius={4} />}
              <Image
                src={post.imageURL}
                maxHeight="460px"
                alt="post image"
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
              />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color="gray.500">
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bgColor: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize="9pt">{post.numberOfComments}</Text>
          </Flex>
          {userIsCreator && (
            <>
              <Button
                height="auto"
                display="flex"
                alignItems="center"
                p="8px 10px"
                borderRadius={4}
                fontWeight={500}
                _hover={{ bgColor: "gray.200" }}
                variant="unstyled"
                leftIcon={<AiOutlineDelete />}
                onClick={handleAlertOpen}
              >
                Delete
              </Button>
              <CustomAlert
                isOpen={isAlertOpen}
                onClose={() => setAlertOpen(false)}
                name="Post"
                onDelete={handleDelete}
                loadingDelete={loadingDelete}
              />
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostItem;
