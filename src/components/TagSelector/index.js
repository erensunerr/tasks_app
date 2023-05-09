import {ScrollView, Text, TouchableOpacity} from "react-native";
import styles from "./styles";

export const TAGS = [
    "Quick Task",
    "Urgent",
    "Important",
    "Work",
    "Family",
    "Social",
    "Vacation Planning"
]

const Tag = ({ text, style, onPress }) => (
    <TouchableOpacity style={[ styles.tag_view, style ]} onPress={onPress}>
        <Text style={[ styles.tag_text ]}>{text}</Text>
    </TouchableOpacity>
)

// styles must have container, first, last and selected
const TagSelector = ({ selectedTags, setSelectedTags, style }) => {
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={[ styles.tag_container, style ]}
        >
            {
                TAGS.map(
                    (tag,i) => <Tag
                        text={tag}
                        key={tag}
                        style={[
                            (i === 0) ? styles.first_tag : null,
                            (i === TAGS.length - 1) ? styles.last_tag : null,
                            selectedTags.includes(tag) ? styles.selected_tag : null,
                        ]}
                        onPress={() => {
                            if (selectedTags.includes(tag)) {
                                // Remove tag
                                setSelectedTags(selectedTags.filter(
                                    (t) => t !== tag
                                ));
                            } else {
                                // Add tag
                                setSelectedTags([...selectedTags, tag]);
                            }
                        }}
                    />
                )
            }
        </ScrollView>
    )
}

export default TagSelector;