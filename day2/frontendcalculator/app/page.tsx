"use client";
import { useState } from "react";
import { usePoll } from "@/contexts/PollContext";
import Navbar from "./components/Navbar";
import { usePollActions } from "@/hooks/pollAction";
import { Users, Vote, Plus, CheckCircle, AlertCircle, Crown, TrendingUp, Wallet, Shield } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const {
    userAddress,
    isConnected,
    totalCandidates,
    isLoading,
    getNoOfCandidates,
    candidatesName,
    owner,
    votes
  } = usePoll();

  const {
    vote,
    isVoting,
    isVoted,
    voteError,
    resetVote,
    addCandidate,
    isAdding,
    isAdded,
    addCandidateError,
    resetAddCandidate,
  } = usePollActions();

  const [newCandidate, setNewCandidate] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");

  console.log("call", getNoOfCandidates);
  console.log("👤 Connected User:", userAddress);
  console.log("👑 Owner:", owner.data);
  console.log("🧑‍🤝‍🧑 Total Candidates:", totalCandidates);
  console.log("📋 Candidate Names:", candidatesName.data);

  const isOwner = userAddress === owner?.data;
  const candidatesList = Array.isArray(candidatesName?.data) ? candidatesName.data : [];

  const chartData = candidatesList?.map((name) => ({
    name,
    votes: Number(votes[name] || 0),
  }));

  const totalVotes = chartData?.reduce((sum, candidate) => sum + candidate.votes, 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <div className="flex justify-center items-center py-6">
          <Navbar />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full backdrop-blur-sm">
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 font-medium">Decentralized • Secure • Transparent</span>
            </div>
            
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6">
              Web3 Voting System
            </h1>
            
            <p className="text-slate-300 text-xl mb-8 max-w-2xl mx-auto">
              Experience the future of democratic participation through blockchain technology
            </p>

            {isOwner && (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full backdrop-blur-sm">
                <Crown className="w-5 h-5 text-amber-400" />
                <span className="text-amber-300 font-semibold">Administrator Access</span>
              </div>
            )}
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{candidatesList.length}</div>
              <div className="text-slate-400">Candidates</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
              <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{totalVotes}</div>
              <div className="text-slate-400">Total Votes</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
              <Wallet className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                {isConnected ? "Connected" : "Disconnected"}
              </div>
              <div className="text-slate-400">Wallet Status</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
              <Shield className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                {isOwner ? "Admin" : "Voter"}
              </div>
              <div className="text-slate-400">Your Role</div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Candidates List */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Candidates</h2>
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                  {candidatesList.length}
                </span>
              </div>

              {candidatesList.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No candidates registered yet</p>
                  <p className="text-slate-500 text-sm mt-2">Waiting for the first candidate to join</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {candidatesList.map((name, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer hover:scale-[1.02] ${
                        selectedCandidate === name
                          ? 'border-purple-500 bg-purple-500/10 shadow-purple-500/20 shadow-lg'
                          : 'border-white/10 hover:border-white/20 bg-white/5'
                      }`}
                      onClick={() => setSelectedCandidate(name)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{name.charAt(0)}</span>
                          </div>
                          <span className="font-medium text-white">{name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 text-sm">
                            {votes[name] ? Number(votes[name]) : 0} votes
                          </span>
                          {selectedCandidate === name && (
                            <CheckCircle className="w-5 h-5 text-purple-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Voting Actions */}
            <div className="space-y-6">
              {/* Vote Section */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <Vote className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Cast Your Vote</h2>
                </div>

                {!isConnected ? (
                  <div className="text-center py-12">
                    <AlertCircle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                    <p className="text-slate-300 mb-4">Connect your wallet to participate</p>
                    <p className="text-slate-500 text-sm">Web3 wallet required for voting</p>
                  </div>
                ) : candidatesList.length === 0 ? (
                  <div className="text-center py-12">
                    <Vote className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">No candidates available for voting</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-3">
                        Select Candidate
                      </label>
                      <input
                        type="text"
                        placeholder="Enter candidate name or select from list"
                        className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-slate-400"
                        value={selectedCandidate}
                        onChange={(e) => setSelectedCandidate(e.target.value)}
                      />
                    </div>

                    <button
                      onClick={() => vote(selectedCandidate)}
                      disabled={isVoting || !selectedCandidate.trim()}
                      className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                    >
                      {isVoting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing Vote...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Vote className="w-5 h-5" />
                          Cast Vote
                        </div>
                      )}
                    </button>

                    {isVoted && (
                      <div className="flex items-center gap-3 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-300 font-medium">Vote successfully recorded on blockchain!</span>
                      </div>
                    )}

                    {voteError && (
                      <div className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <span className="text-red-300">{voteError.message}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Add Candidate Section (Owner Only) */}
              {isOwner && (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <Plus className="w-6 h-6 text-amber-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Add New Candidate</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-3">
                        Candidate Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter candidate name"
                        className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-white placeholder-slate-400"
                        value={newCandidate}
                        onChange={(e) => setNewCandidate(e.target.value)}
                      />
                    </div>

                    <button
                      onClick={() => addCandidate(newCandidate)}
                      disabled={isAdding || !newCandidate.trim()}
                      className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                    >
                      {isAdding ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Adding to Blockchain...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Plus className="w-5 h-5" />
                          Add Candidate
                        </div>
                      )}
                    </button>

                    {isAdded && (
                      <div className="flex items-center gap-3 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-300 font-medium">Candidate successfully added!</span>
                      </div>
                    )}

                    {addCandidateError && (
                      <div className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <span className="text-red-300">{addCandidateError.message}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Vote Results Chart */}
          {chartData && chartData.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Live Vote Results</h2>
                <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium">
                  Real-time
                </span>
              </div>
              
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#9CA3AF" 
                      fontSize={12}
                      tick={{ fill: '#9CA3AF' }}
                    />
                    <YAxis 
                      stroke="#9CA3AF" 
                      fontSize={12}
                      tick={{ fill: '#9CA3AF' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: 'white'
                      }}
                    />
                    <Bar 
                      dataKey="votes" 
                      fill="url(#colorGradient)"
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}