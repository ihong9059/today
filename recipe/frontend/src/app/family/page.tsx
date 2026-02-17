"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { familyApi } from "@/lib/api";
import { useStore } from "@/store/useStore";
import { Users, Plus, Copy, LogOut, ShoppingCart } from "lucide-react";
import type { Family, User } from "@/types";

export default function FamilyPage() {
  const { user } = useStore();
  const [family, setFamily] = useState<Family | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [familyName, setFamilyName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [shoppingList, setShoppingList] = useState<{ item: string; added_by: string }[]>([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetchFamily();
  }, []);

  async function fetchFamily() {
    setLoading(true);
    try {
      const infoRes = await familyApi.getInfo();
      setFamily(infoRes.data);

      const membersRes = await familyApi.getMembers();
      setMembers(membersRes.data);

      const listRes = await familyApi.getShoppingList();
      setShoppingList(listRes.data.list || []);
    } catch (error) {
      // No family
      setFamily(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateFamily() {
    if (!familyName.trim()) return;
    try {
      await familyApi.create(familyName);
      await fetchFamily();
      setShowCreate(false);
      setFamilyName("");
    } catch (error) {
      console.error("Failed to create family:", error);
    }
  }

  async function handleJoinFamily() {
    if (!inviteCode.trim()) return;
    try {
      await familyApi.join(inviteCode);
      await fetchFamily();
      setShowJoin(false);
      setInviteCode("");
    } catch (error) {
      console.error("Failed to join family:", error);
    }
  }

  async function handleLeaveFamily() {
    if (!confirm("정말 가족 그룹을 나가시겠습니까?")) return;
    try {
      await familyApi.leave();
      setFamily(null);
      setMembers([]);
      setShoppingList([]);
    } catch (error) {
      console.error("Failed to leave family:", error);
    }
  }

  async function handleAddItem() {
    if (!newItem.trim()) return;
    try {
      const response = await familyApi.addToShoppingList(newItem);
      setShoppingList(response.data.list);
      setNewItem("");
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  }

  function copyInviteCode() {
    if (family?.invite_code) {
      navigator.clipboard.writeText(family.invite_code);
      alert("초대 코드가 복사되었습니다!");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-500" />
      </div>
    );
  }

  // No family - show create/join options
  if (!family) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">가족 공유</h1>

        <Card>
          <CardContent className="py-12 text-center">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-6">
              가족과 함께 식단을 계획하고 장바구니를 공유하세요
            </p>
            <div className="flex flex-col gap-3 max-w-xs mx-auto">
              <Button variant="cta" onClick={() => setShowCreate(true)}>
                <Plus className="h-4 w-4 mr-2" />
                가족 그룹 만들기
              </Button>
              <Button variant="outline" onClick={() => setShowJoin(true)}>
                초대 코드로 참여
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Create Family Modal */}
        {showCreate && (
          <Card>
            <CardHeader>
              <CardTitle>가족 그룹 만들기</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="가족 이름 (예: 우리 가족)"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
              />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowCreate(false)}>
                  취소
                </Button>
                <Button variant="cta" onClick={handleCreateFamily}>
                  만들기
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Join Family Modal */}
        {showJoin && (
          <Card>
            <CardHeader>
              <CardTitle>가족 그룹 참여</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="초대 코드 입력"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
              />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowJoin(false)}>
                  취소
                </Button>
                <Button variant="cta" onClick={handleJoinFamily}>
                  참여하기
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Has family
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{family.name}</h1>
        <Button variant="ghost" size="icon" onClick={handleLeaveFamily}>
          <LogOut className="h-5 w-5 text-red-500" />
        </Button>
      </div>

      {/* Invite Code */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">초대 코드</p>
              <p className="text-xl font-mono font-bold">{family.invite_code}</p>
            </div>
            <Button variant="outline" size="icon" onClick={copyInviteCode}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            구성원 ({members.length}명)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center">
                    <span className="text-sage-600 font-medium">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
                {member.id === user?.id && (
                  <span className="text-xs bg-sage-100 text-sage-600 px-2 py-1 rounded">
                    나
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shared Shopping List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            공유 장바구니
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="장볼 것 추가"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
            />
            <Button variant="cta" onClick={handleAddItem}>
              추가
            </Button>
          </div>
          {shoppingList.length === 0 ? (
            <p className="text-gray-400 text-center py-4">
              장바구니가 비어있습니다
            </p>
          ) : (
            <div className="space-y-2">
              {shoppingList.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span>{item.item}</span>
                  <span className="text-sm text-gray-400">{item.added_by}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
