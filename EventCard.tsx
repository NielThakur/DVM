import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
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
});

export default function EventCard({
  name,
  category,
  day,
  time,
  venue,
  registrations,
}: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.body}>{"Category: " + category}</Text>
      <Text style={styles.body}>{"Day: " + day}</Text>
      <Text style={styles.body}>{"Time: " + time}</Text>
      <Text style={styles.body}>{"Venue: " + venue}</Text>
      <Text style={styles.body}>{"Registrations: " + registrations}</Text>
    </View>
  );
}
