import { User, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { Member } from '@/types';
import { formatCurrency } from '@/utils/formatters';

interface MemberCardProps {
  member: Member;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-start space-x-4">
        <div className="bg-indigo-100 rounded-full p-3">
          <User className="w-8 h-8 text-indigo-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{member.name}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Idade</p>
                <p className="font-semibold text-gray-800">{member.age} anos</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Aposentadoria</p>
                <p className="font-semibold text-gray-800">{member.retirement_age} anos</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Expectativa</p>
                <p className="font-semibold text-gray-800">{member.life_expectancy} anos</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Renda</p>
                <p className="font-semibold text-gray-800">{formatCurrency(member.net_income)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};