import { StarIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/react"
import { useState } from "react"

export const LikeButton = ({id, counts}: {id: string, counts: number}) => {

    const [likes, setLikes] = useState({id, counts})
    return (
        <Button
            aria-label="Like"
            rightIcon={<StarIcon />}
            variant="ghost"
            colorScheme='yellow'
            onClick={() => setLikes(prevLikes => ({...prevLikes, counts: prevLikes.counts+1 }))}
            size="sm">{likes.counts} Likes</Button>
    )
}