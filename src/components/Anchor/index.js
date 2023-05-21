import { Text } from "react-native";
import {useState} from "react";

const Anchor = ({children, onPress, style, ...props}) => {
    // Change opacity on is hover.
    const [isHovering, setIsHovering] = useState(false);

    const opacity = isHovering ? 0.2 : 1.0;

    const opacity_style = {
        opacity,
    };

    return (
        <Text
            onPressIn={() => setIsHovering(true)}
            onPressOut={() => setIsHovering(false)}
            onPress={onPress}
            style={[style, opacity_style]}
            suppressHighlighting={true}
        >
            {/*     Suppress Highlighting removes the default background effect that occurs onPress.

            */}
            {children}
        </Text>
    );
}

export default Anchor;