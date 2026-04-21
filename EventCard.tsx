import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  name: string;
  category: string;
  day: number;
  time: string;
  venue: string;
  registrations: number;

  isBookmarked: boolean;
  onBookmark: () => void;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    overflow: "visible",

    position: "relative",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  body: {
    color: "#94a3b8",
    marginTop: 5,
    fontSize: 14,
  },
  bookmarkIcon: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 1000,
    elevation: 1000,
    padding: 8,
  },
});

export default function EventCard({
  name,
  category,
  day,
  time,
  venue,
  registrations,
  isBookmarked,
  onBookmark,
}: Props) {
  return (
    <View style={styles.card} pointerEvents="box-none">
      <View style={styles.bookmarkIcon}>
        <Ionicons
          name={isBookmarked ? "bookmark" : "bookmark-outline"}
          size={26}
          color={isBookmarked ? "#e40606" : "#94a3b8"}
          onPress={() => {
            console.log("BOOKMARK CLICKED");
            onBookmark();
          }}
          activeOpacity={0.6}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        />
      </View>

      <Text style={styles.title}>{name}</Text>
      <Text style={styles.body}>Category: {category}</Text>
      <Text style={styles.body}>Day: {day}</Text>
      <Text style={styles.body}>Time: {time}</Text>
      <Text style={styles.body}>Venue: {venue}</Text>
      <Text style={styles.body}>Registrations: {registrations}</Text>
    </View>
  );
}
