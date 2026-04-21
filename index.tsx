import EventCard from "@/components/EventCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
  searchBar: {
    backgroundColor: "#1e293b",
    color: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  filterBtn: {
    backgroundColor: "#334155",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  filterText: {
    color: "white",
    textAlign: "center",
  },
  dropdown: {
    backgroundColor: "#1e293b",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  checkbox: {
    color: "white",
    marginVertical: 4,
  },
});

export default function HomeScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarks, setBookmarks] = useState<Event[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortByDay, setSortByDay] = useState(false);
  const [sortByRegistrations, setSortByRegistrations] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim() === "") {
        fetch("https://recruitments.bits-dvm.org/events")
          .then((res) => res.json())
          .then((data) => setEvents(data));
      } else {
        fetch(`https://recruitments.bits-dvm.org/events/search?q=${search}`)
          .then((res) => res.json())
          .then((data) => setEvents(data));
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const loadBookmarks = async () => {
      const data = await AsyncStorage.getItem("bookmarks");
      if (data) {
        setBookmarks(JSON.parse(data));
      }
    };

    loadBookmarks();
  }, []);

  const toggleBookmark = async (event: Event) => {
    let updated;

    const exists = bookmarks.find((e) => e.id === event.id);

    if (exists) {
      updated = bookmarks.filter((e) => e.id !== event.id);
    } else {
      updated = [...bookmarks, event];
    }

    setBookmarks(updated);
    await AsyncStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  let filteredEvents = events;

  if (showBookmarks) {
    filteredEvents = filteredEvents.filter((e) =>
      bookmarks.some((b) => b.id === e.id),
    );
  }

  const categories = [...new Set(events.map((e) => e.category))];

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  let filtered = events.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (selectedCategories.length > 0) {
    filtered = filtered.filter((e) => selectedCategories.includes(e.category));
  }

  if (sortByDay) {
    filtered = [...filtered].sort((a, b) => a.day - b.day);
  }

  if (sortByRegistrations) {
    filtered = [...filtered].sort((a, b) => b.registrations - a.registrations);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Events</Text>

      <TextInput
        placeholder="Search events..."
        placeholderTextColor="#94a3b8"
        value={search}
        onChangeText={setSearch}
        style={styles.searchBar}
      />

      <TouchableOpacity
        style={styles.filterBtn}
        onPress={() => setShowBookmarks(!showBookmarks)}
      >
        <Text style={styles.filterText}>
          {showBookmarks ? "Show All Events" : "Show Bookmarked Events"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.filterBtn}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text style={styles.filterText}>Filters</Text>
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdown}>
          <Text style={{ color: "white", marginBottom: 5 }}>Categories:</Text>

          {categories.map((cat) => (
            <TouchableOpacity key={cat} onPress={() => toggleCategory(cat)}>
              <Text style={styles.checkbox}>
                {selectedCategories.includes(cat) ? "☑ " : "☐ "}
                {cat}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={() => {
              setSortByDay(true);
              setSortByRegistrations(false);
            }}
          >
            <Text style={styles.checkbox}>Sort by Day</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSortByRegistrations(true);
              setSortByDay(false);
            }}
          >
            <Text style={styles.checkbox}>Sort by Registrations</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EventCard
            {...item}
            onBookmark={() => toggleBookmark(item)}
            isBookmarked={bookmarks.some((e) => e.id === item.id)}
          />
        )}
      />

      {filteredEvents.length === 0 && (
        <Text style={{ color: "white" }}>No events found</Text>
      )}
    </View>
  );
}

