import React from "react";
import CurriculumList from "../components/curriculum/CurriculumList";
import TopicList from "../components/curriculum/TopicList";
import ContentList from "../components/curriculum/ContentList";
import { supabase } from "../lib/supabase";
import type { Database } from "../lib/database.types";
import { useQuery } from "@tanstack/react-query";

type Topic = Database["public"]["Tables"]["topics"]["Row"];
type ThematicAxis = Database['public']['Tables']['thematic_axes']['Row'];

const Curriculum = () => {
  const [selectedAxis, setSelectedAxis] = React.useState<string | 0>(0);
  const [selectedTopic, setSelectedTopic] = React.useState<string | 0>(0);

  const { data: topicsItems } = useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("topics")
        .select("*")
        .order("name");

      if (error) throw error;
      return data as Topic[];
    },
  });

  const { data: axes } = useQuery({
    queryKey: ['thematic-axes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('thematic_axes')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as ThematicAxis[];
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Curriculum Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Thematic Axes
          </h2>
          <CurriculumList
            onSelectAxis={setSelectedAxis}
            selectedAxis={selectedAxis}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <TopicList
            axisId={selectedAxis}
            onSelectTopic={setSelectedTopic}
            selectedTopic={selectedTopic}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Contents</h2>
          <ContentList topicId={selectedTopic} />
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
