import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Topic } from '../../types/curriculum';

export const TopicDetails: React.FC = () => {
  const { axes, selectedTopicId } = useSelector((state: RootState) => state.curriculum);
  
  const selectedTopic = React.useMemo(() => {
    return axes
      .flatMap((axis) => axis.topics)
      .find((topic) => topic.id === selectedTopicId);
  }, [axes, selectedTopicId]);

  if (!selectedTopic) {
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <p className="text-gray-500">Select a topic to view details</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{selectedTopic.name}</h2>
      {selectedTopic.description && (
        <p className="text-gray-600 mb-6">{selectedTopic.description}</p>
      )}
      
      <h3 className="text-lg font-semibold mb-3">Contents</h3>
      <div className="space-y-4">
        {selectedTopic.contents.map((content) => (
          <div
            key={content.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Sequence {content.sequenceOrder}</span>
            </div>
            <p className="mt-2 text-gray-600">{content.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};