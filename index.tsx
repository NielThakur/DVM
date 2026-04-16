import EventCard from "@/components/EventCard";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

type Event = {
  id: number;
  name: string;
  category: string;
  day: number;
  time: string;
  venue: string;
  registrations: number;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#0f172a",
  },
  heading: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
  SearchBar: {
    backgroundColor: "#1e293b",
    color: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
});

export default function HomeScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      "https://mrjson.com/api?id={index|1}&name={firstName}&category=[Music,Tech,Sports]&day={number|1,3}&time={date|HH:mm}&venue={business}&registrations={number|50,2000}",
    )
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Events</Text>
      <TextInput
        placeholder="Search events..."
        placeholderTextColor="#94a3b8"
        value={search}
        onChangeText={setSearch}
        style={styles.SearchBar}
      />
      {events.length === 0 && (
        <Text style={{ color: "white" }}>No events found</Text>
      )}
      <FlatList
        data={events.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: Event }) => (
          <EventCard
            name={item.name}
            category={item.category}
            day={item.day}
            time={item.time}
            venue={item.venue}
            registrations={item.registrations}
          />
        )}
      />
    </View>
  );
}
